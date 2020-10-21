<?php
/**====================== addMaintenance ===============================
 *======================================================================
 *===============  __  __     __  __     __  __     ====================
 *=============== /\ \_\ \   /\ \/ /    /\ \_\ \    ====================
 *=============== \ \  __ \  \ \  _"-.  \ \  __ \   ====================
 *===============  \ \_\ \_\  \ \_\ \_\  \ \_\ \_\  ====================
 *===============   \/_/\/_/   \/_/\/_/   \/_/\/_/  ====================
 *======================================================================
 *====================================================================*/

namespace App\Events;

use ApiPlatform\Core\EventListener\EventPriorities;
use App\Entity\Quotations;
use App\Repository\QuotationsRepository;
use Symfony\Component\EventDispatcher\EventSubscriberInterface;
use Symfony\Component\HttpKernel\Event\ViewEvent;
use Symfony\Component\HttpKernel\KernelEvents;
use Symfony\Component\Security\Core\Security;

class AddQuotations implements EventSubscriberInterface
{

    /*Récupérer l'utilisateur via Security*/
    private $security;
    private $repository;

    public function __construct(Security $security, QuotationsRepository $repository)
    {
        $this->security = $security;
        $this->repository = $repository;
    }

    public static function getSubscribedEvents()
    {
        return [
            KernelEvents::VIEW => ['setRequireForQuotations', EventPriorities::PRE_VALIDATE]
        ];
    }

    public function setRequireForQuotations(ViewEvent $event)
    {


        $addRequire = $event->getControllerResult();
        $method = $event->getRequest()->getMethod();


        if ($addRequire instanceof Quotations && $method === "POST") {
            $user = $this->security->getUser();
            $addRequire->setAuthor($user);
            $addRequire->setStatus('WAIT');
            //création automatique de la date
            $addRequire->setSentAt(new\DateTime());
            $nextChrono = $this->repository->findNextChrono($this->security->getUser());
            $addRequire->setChrono($nextChrono);

        }
    }
}