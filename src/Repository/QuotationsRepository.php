<?php

namespace App\Repository;

use App\Entity\Quotations;
use App\Entity\Users;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;
use http\Client\Curl\User;

/**
 * @method Quotations|null find($id, $lockMode = null, $lockVersion = null)
 * @method Quotations|null findOneBy(array $criteria, array $orderBy = null)
 * @method Quotations[]    findAll()
 * @method Quotations[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class QuotationsRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, Quotations::class);
    }

    public function findNextChrono(Users $user){
        return $this->createQueryBuilder("i")
            ->select("i.chrono")
            ->join("i.author","c")
            ->where("c.id = :user")
            ->setParameter("user", $user)
            ->orderBy("i.chrono", "DESC")
            ->setMaxResults(1)
            ->getQuery()
            ->getSingleScalarResult() + 1;
    }



    // /**
    //  * @return Quotations[] Returns an array of Quotations objects
    //  */
    /*
    public function findByExampleField($value)
    {
        return $this->createQueryBuilder('q')
            ->andWhere('q.exampleField = :val')
            ->setParameter('val', $value)
            ->orderBy('q.id', 'ASC')
            ->setMaxResults(10)
            ->getQuery()
            ->getResult()
        ;
    }
    */

    /*
    public function findOneBySomeField($value): ?Quotations
    {
        return $this->createQueryBuilder('q')
            ->andWhere('q.exampleField = :val')
            ->setParameter('val', $value)
            ->getQuery()
            ->getOneOrNullResult()
        ;
    }
    */
}
