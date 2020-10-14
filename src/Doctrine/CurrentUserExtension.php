<?php

namespace App\Doctrine;

use ApiPlatform\Core\Bridge\Doctrine\Orm\Extension\QueryCollectionExtensionInterface;
use ApiPlatform\Core\Bridge\Doctrine\Orm\Extension\QueryItemExtensionInterface;
use ApiPlatform\Core\Bridge\Doctrine\Orm\Util\QueryNameGeneratorInterface;
use App\Entity\Invoices;
use App\Entity\Maintenances;
use App\Entity\Pose;
use App\Entity\Quotations;
use App\Entity\Users;
use Doctrine\ORM\QueryBuilder;
use Symfony\Component\Security\Core\Authorization\AuthorizationCheckerInterface;
use Symfony\Component\Security\Core\Security;

class CurrentUserExtension implements QueryCollectionExtensionInterface, QueryItemExtensionInterface
{
    private $security;

    public function __construct(Security $security, AuthorizationCheckerInterface $checker)
    {
        $this->security = $security;
    }

    /*Factorisation du code*/
    private function addWhere(QueryBuilder $queryBuilder, string $resourceClass){
        $user = $this->security->getuser();
        /*Donne les maintenances effectuées par l'utilisateur connecté. */
        if ($resourceClass === Users::class || $resourceClass === Maintenances::class) {
            $rootAlias = $queryBuilder->getRootAliases()[0];
            $queryBuilder
                ->join("$rootAlias.technician", "c")
                ->andWhere("c = :user");
        }
        if ($resourceClass === Pose::class) {
            $rootAlias = $queryBuilder->getRootAliases()[0];
            $queryBuilder
                ->join("$rootAlias.technician", "c")
                ->andWhere("c = :user");
        }
        if ($resourceClass === Invoices::class) {
            $rootAlias = $queryBuilder->getRootAliases()[0];
            $queryBuilder
                ->join("$rootAlias.seller", "c")
                ->andWhere("c = :user");
        }
        if ($resourceClass === Quotations::class) {
            $rootAlias = $queryBuilder->getRootAliases()[0];
            $queryBuilder
                ->join("$rootAlias.author", "c")
                ->andWhere("c = :user")
            ;
        }
        $queryBuilder->setParameter("user", $user);
        /* dd($queryBuilder);*/
    }

    public function applyToCollection(QueryBuilder $queryBuilder, QueryNameGeneratorInterface
    $queryNameGenerator, string $resourceClass, string $operationName = null)
    {
        $this->addWhere($queryBuilder, $resourceClass);
    }

    public function applyToItem(QueryBuilder $queryBuilder, QueryNameGeneratorInterface $queryNameGenerator,
    string $resourceClass, array $identifiers, string $operationName = null, array $context = [])
    {
        $this->addWhere($queryBuilder, $resourceClass);
    }
}
