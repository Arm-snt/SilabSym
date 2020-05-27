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

    public function Mostrar(){
        try {
            $conn = $this->getEntityManager()->getConnection();
            $stm = $conn->prepare("SELECT lab.id, lab.codlaboratorio, lab.nombre, lab.ubicacion, lab.observacion, ele.id, ele.elemento, usu.id, usu.codusuario, usu.usuario
            FROM laboratorio lab, elemento ele, usuario usu
            WHERE lab.usuario_id=usu.id AND usu.tipousuario='Laboratorista' AND ele.laboratorio_id = lab.id GROUP BY lab.id ORDER BY lab.nombre");
            $stm->execute([]);
            $res = $stm->fetchAll();
            return $res;
        } catch (Exception $e) {
            return $e;
        }
    }

    public function Insertar($codlaboratorio, $usuario_id, $nombre, $ubicacion, $observacion){
        try {
            $conn = $this->getEntityManager()->getConnection();
            $stm = $conn->prepare(" INSERT INTO laboratorio (codlaboratorio, usuario_id, nombre, ubicacion, observacion) VALUES (:codlaboratorio, :usuario_id, :nombre, :ubicacion, :observacion)");
            if($stm->execute(array(':codlaboratorio'=>$codlaboratorio, ':usuario_id'=>$usuario_id, ':nombre'=>$nombre, ':ubicacion'=>$ubicacion, ':observacion'=>$observacion)));
        } catch (Exception $e) {
            return $e;
        }
    }


    public function Buscar($id,$estudiante_id,$registro,$descripcion){
        try {
            $conn = $this->getEntityManager()->getConnection();
            $stm = $conn->prepare(" SELECT tra.estudiante_id, est.nombre, tra.registro, tra.descripcion 
            FROM trabajo tra, estudiante est
            WHERE tra.id=:tra AND tra.estudiante_id=est.id");
            $tra=$id;
            if($stm->execute(array(':tra'=>$tra)))
            $res = $stm->fetch();
            return $res;
        } catch (Exception $e) {
            return $e;
        }
    }

    
    public function Actualizar($id,$estudiante_id,$registro,$descripcion){
        try {
            $conn = $this->getEntityManager()->getConnection();
            $stm = $conn->prepare(" UPDATE trabajo SET estudiante_id = :estudiante_id, registro=:registro, descripcion=:descripcion  WHERE trabajo.id =:id");
            if($stm->execute(array(':id'=>$id, ':estudiante_id' =>$estudiante_id, ':registro'=>$registro, ':descripcion'=>$descripcion)));
        } catch (Exception $e) {
            return $e;
        }
    }

    public function Eliminar($id){
        try {
            $conn = $this->getEntityManager()->getConnection();
            $stm = $conn->prepare(" DELETE FROM trabajo WHERE trabajo.id =:id");
            if($stm->execute(array(':id'=>$id)));
        } catch (Exception $e) {
            return $e;
        }
    }




    // /**
    //  * @return Laboratorio[] Returns an array of Laboratorio objects
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
    public function findOneBySomeField($value): ?Laboratorio
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