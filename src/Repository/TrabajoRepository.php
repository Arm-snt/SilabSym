<?php

namespace App\Repository;

use App\Entity\Trabajo;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Common\Persistence\ManagerRegistry;

/**
 * @method Trabajo|null find($id, $lockMode = null, $lockVersion = null)
 * @method Trabajo|null findOneBy(array $criteria, array $orderBy = null)
 * @method Trabajo[]    findAll()
 * @method Trabajo[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class TrabajoRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, Trabajo::class);
    }

    public function Mostrar(){
        try {
            $conn = $this->getEntityManager()->getConnection();
            $stm = $conn->prepare(" SELECT est.nombre, tra.registro, tra.descripcion 
            FROM trabajo tra, estudiante est
            WHERE tra.estudiante_id=est.id");
            $stm->execute([]);
            $res = $stm->fetchAll();
            return $res;
        } catch (Exception $e) {
            return $e;
        }
    }

    public function Insertar($dato1, $dato2, $dato3){
        try {
            $conn = $this->getEntityManager()->getConnection();
            $stm = $conn->prepare(" INSERT INTO trabajo (estudiante_id, registro, descripcion) VALUES (:tra, :reg, :cri)");
            $tra=$dato1;
            $reg= $dato2;
            $cri= $dato3;
            if($stm->execute(array(':tra'=>$tra, ':reg'=>$reg, ':cri'=>$cri)));
        } catch (Exception $e) {
            return $e;
        }
    }

    public function Actualizar(){
        try {
            $conn = $this->getEntityManager()->getConnection();
            $stm = $conn->prepare(" UPDATE trabajo SET estudiante_id = 21 WHERE trabajo.id = 7");
            $stm->execute([]);
            $stm->close();
        } catch (Exception $e) {
            return $e;
        }
    }


    // /**
    //  * @return Trabajo[] Returns an array of Trabajo objects
    //  */
    /*
    public function findByExampleField($value)
    {
        return $this->createQueryBuilder('t')
            ->andWhere('t.exampleField = :val')
            ->setParameter('val', $value)
            ->orderBy('t.id', 'ASC')
            ->setMaxResults(10)
            ->getQuery()
            ->getResult()
        ;
    }
    */

    /*
    public function findOneBySomeField($value): ?Trabajo
    {
        return $this->createQueryBuilder('t')
            ->andWhere('t.exampleField = :val')
            ->setParameter('val', $value)
            ->getQuery()
            ->getOneOrNullResult()
        ;
    }
    */
}