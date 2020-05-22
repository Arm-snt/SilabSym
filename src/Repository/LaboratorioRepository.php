<?php

namespace App\Repository;

use App\Entity\Laboratorio;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Common\Persistence\ManagerRegistry;

/**
 * @method Laboratorio|null find($id, $lockMode = null, $lockVersion = null)
 * @method Laboratorio|null findOneBy(array $criteria, array $orderBy = null)
 * @method Laboratorio[]    findAll()
 * @method Laboratorio[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class LaboratorioRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, Laboratorio::class);
    }

    // /**
    //  * @return Laboratorio[] Returns an array of Laboratorio objects
    //  */
    /*
    public function findByExampleField($value)
    {
        return $this->createQueryBuilder('l')
            ->andWhere('l.exampleField = :val')
            ->setParameter('val', $value)
            ->orderBy('l.id', 'ASC')
            ->setMaxResults(10)
            ->getQuery()
            ->getResult()
        ;
    }
    */

    /*
    public function findOneBySomeField($value): ?Laboratorio
    {
        return $this->createQueryBuilder('l')
            ->andWhere('l.exampleField = :val')
            ->setParameter('val', $value)
            ->getQuery()
            ->getOneOrNullResult()
        ;
    }
    */
}
