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
use App\Entity\Maintenances;
use Symfony\Component\EventDispatcher\EventSubscriberInterface;
use Symfony\Component\HttpKernel\Event\ViewEvent;
use Symfony\Component\HttpKernel\KernelEvents;
use Symfony\Component\Security\Core\Security;

class AddMaintenances implements EventSubscriberInterface {

    /*Récupérer l'utilisateur via Security*/
    private $security;

    public function __construct(Security $security)
    {
       $this->security = $security;
    }

    public static function getSubscribedEvents()
    {
        return [
          KernelEvents::VIEW => ['setUserForMaintenance', EventPriorities::PRE_VALIDATE]
        ];
    }

    public function setUserForMaintenance(ViewEvent $event){
        $addMaintenance = $event->getControllerResult();
        $method = $event->getRequest()->getMethod();

            if($addMaintenance instanceof Maintenances && $method === "POST") {
                $user = $this->security->getUser();
                $addMaintenance->addTechnician($user);
                //création automatique de la date
                $addMaintenance->setDate(new\DateTime() );
            }
    }
}