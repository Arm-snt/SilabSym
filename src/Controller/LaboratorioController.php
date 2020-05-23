<?php

namespace App\Controller;
use App\Entity\Laboratorio;
use App\Repository\LaboratorioRepository;
use Doctrine\DBAL\Exception\UniqueConstraintViolationException;
use Doctrine\ORM\EntityManagerInterface;
use Exception;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;

  /**
 * @Route("/api/laboratorio", name="api_laboratorio")
 */
class LaboratorioController extends AbstractController
{
    private $entityManager;
    private $laboratorioRepository;
 
    public function __construct(EntityManagerInterface $entityManager, LaboratorioRepository $laboratorioRepository)
    {
        $this->entityManager = $entityManager;
        $this->laboratorioRepository = $laboratorioRepository;
    }
    /**
     * @Route("/read", name="api_laboratorio_read", methods={"GET"})
     */
    public function read()
    {
        $todos = $this->getDoctrine()->getRepository(Laboratorio::class, 'default');
        $todos = $this->laboratorioRepository->Mostrar();
        return $this->json($todos);
    }

    /**
     * @Route("/create", name="api_laboratorio_create", methods={"POST"})
     * @param Request $request
     * @return JsonResponse
     */
    public function create(Request $request)
    {
        $content = json_decode($request->getContent(), true);
               
        $codlaboratorio=$content['codlaboratorio'];
        $usuario_id=$content['usuario_id'];
        $nombre=$content['nombre'];
        $ubicacion=$content['ubicacion'];
        $observacion=$content['observacion'];
        
        try {
            
            $todo = $this->getDoctrine()->getRepository(Laboratorio::class, 'default');
            $todo = $this->laboratorioRepository->Insertar($codlaboratorio, $usuario_id, $nombre, $ubicacion, $observacion);
                
        } catch (Exception $exception) {
            return $this->json([ 
                'message' => ['text'=>['El laboratorio no se ha podido registrar!'.$exception] , 'level'=>'error']
                ]);
        }  
            return $this->json([
                'message' => ['text'=>['El laboratorio de '.$estudiante_id, 'se ha registrado!' ] , 'level'=>'success']      
                 ]);
    }

    /**
     * @Route("/update/{id}", name="api_laboratorio_update", methods={"PUT"})
     * @param Request $request
     * @param Laboratorio $todo
     * @return JsonResponse
     */
    public function update(Request $request, Laboratorio $todo)
    {
        $content = json_decode($request->getContent());
        
        $id=$content->id;
        $estudiante_id=$content->estudiante_id;
        $registro=$content->registro;
        $descripcion=$content->descripcion;
        
        $todo = $this->getDoctrine()->getRepository(Laboratorio::class, 'default');
        $todo = $this->laboratorioRepository->Buscar($id,$estudiante_id,$registro,$descripcion);
        

        $estudiante_id_bd=$todo['estudiante_id'];
        $registro_bd=$todo['registro'];
        $descripcion_bd=$todo['descripcion'];
        $nombre_bd=$todo['nombre'];

        if ($estudiante_id===$estudiante_id_bd && $registro===$registro_bd && $descripcion===$descripcion_bd) {
            return $this->json([
                'message' => ['text'=>['No se realizaron cambios al estudiante: '.$nombre_bd] , 'level'=>'warning']
            ]);
        }

        try {

            $todo = $this->laboratorioRepository->Actualizar($id,$estudiante_id,$registro,$descripcion);
        } catch (Exception $exception) {
            return $this->json([ 
                'message' => ['text'=>['No se pudo acceder a la Base de datos mientras se actualizaba el laboratorio!'] , 'level'=>'error']
                ]);
        }
 
        return $this->json([
            'message' => ['text'=>['El laboratorio se ha actualizado!' ] , 'level'=>'success']      
        ]);
 
    }

    /**
     * @Route("/delete/{id}", name="api_laboratorio_delete", methods={"DELETE"})
     * @param Laboratorio $todo
     * @param Request $request
     * @return JsonResponse
     */
    public function delete(Request $request, Laboratorio $todo)
    {
        try {
            $this->entityManager->remove($todo);
            $this->entityManager->flush();
        } catch (Exception $exception) {
            return $this->json([ 
                'message' => ['text'=>['No se pudo acceder a la Base de datos mientras se eliminaba el laboratorio!'] , 'level'=>'error']
                ]);
        }
 
        return $this->json([
            'message' => ['text'=>['Se ha eliminado la informacion del laboratorio'] , 'level'=>'success']
        ]);
 
    }
 
    
    
    public function delete2(Request $request, Laboratorio $todo)
    {
         function toArray(){
            return ['id' => $this->id,'registro' => $this->registro, 'descripcion' => $this->descripcion];
        }

        $id[] = $todo->toArray();
        dd($id);
        
        try {
            $todo = $this->getDoctrine()->getRepository(Laboratorio::class, 'default');
            $todo = $this->laboratorioRepository->Eliminar($id);    
        } catch (Exception $exception) {
            return $this->json([ 
                'message' => ['text'=>['No se pudo acceder a la Base de datos mientras se eliminaba el laboratorio!'.$exception] , 'level'=>'error']
                ]);
        }
        return $this->json([
            'message' => ['text'=>['Se ha eliminado la informacion del laboratorio'] , 'level'=>'success']
        ]);
 
    }
  
}