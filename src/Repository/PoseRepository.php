<?php

namespace App\Repository;

use App\Entity\Pose;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @method Pose|null find($id, $lockMode = null, $lockVersion = null)
 * @method Pose|null findOneBy(array $criteria, array $orderBy = null)
 * @method Pose[]    findAll()
 * @method Pose[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class PoseRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, Pose::class);
    }

    // /**
    //  * @return Pose[] Returns an array of Pose objects
    //  */
    /*
    public function findByExampleField($value)
    {
        return $this->createQueryBuilder('p')
            ->andWhere('p.exampleField = :val')
            ->setParameter('val', $value)
            ->orderBy('p.id', 'ASC')
            ->setMaxResults(10)
            ->getQuery()
            ->getResult()
        ;
    }
    */

    /*
    public function findOneBySomeField($value): ?Pose
    {
        return $this->createQueryBuilder('p')
            ->andWhere('p.exampleField = :val')
            ->setParameter('val', $value)
            ->getQuery()
            ->getOneOrNullResult()
        ;
    }
    */
}
