<?php

namespace App\Repository;

use App\Entity\Estudiante;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Common\Persistence\ManagerRegistry;

/**
 * @method Estudiante|null find($id, $lockMode = null, $lockVersion = null)
 * @method Estudiante|null findOneBy(array $criteria, array $orderBy = null)
 * @method Estudiante[]    findAll()
 * @method Estudiante[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class EstudianteRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, Estudiante::class);
    }

    public function BuscarElementoPorId($id){
        return $this->getEntityManager()
            ->createQuery(
                '
                    SELECT estudiante.id, estudiante.codigo, estudiante.nombre 
                    FROM App\Entity\Estudiante estudiante
                    WHERE estudiante.id=:identificacion
                '
            )
            ->setParameter('identificacion',$id)
            ->getSingleResult()
            ;
    }

    // /**
    //  * @return Estudiante[] Returns an array of Estudiante objects
    //  */
    /*
    public function findByExampleField($value)
    {
        return $this->createQueryBuilder('e')
            ->andWhere('e.exampleField = :val')
            ->setParameter('val', $value)
            ->orderBy('e.id', 'ASC')
            ->setMaxResults(10)
            ->getQuery()
            ->getResult()
        ;
    }
    */

    /*
    public function findOneBySomeField($value): ?Estudiante
    {
        return $this->createQueryBuilder('e')
            ->andWhere('e.exampleField = :val')
            ->setParameter('val', $value)
            ->getQuery()
            ->getOneOrNullResult()
        ;
    }
    */
}
