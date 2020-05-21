<?php

namespace App\Controller;
use App\Entity\Trabajo;
use App\Repository\TrabajoRepository;
use Doctrine\DBAL\Exception\UniqueConstraintViolationException;
use Doctrine\ORM\EntityManagerInterface;
use Exception;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;

  /**
 * @Route("/api/trabajo", name="api_trabajo")
 */
class TrabajoController extends AbstractController
{
    private $entityManager;
    private $trabajoRepository;
 
    public function __construct(EntityManagerInterface $entityManager, TrabajoRepository $trabajoRepository)
    {
        $this->entityManager = $entityManager;
        $this->trabajoRepository = $trabajoRepository;
    }
    /**
     * @Route("/read", name="api_trabajo_read", methods={"GET"})
     */
    public function read()
    {
        $todos = $this->getDoctrine()->getRepository(Trabajo::class, 'default');
        $todos = $this->trabajoRepository->Mostrar();
        return $this->json($todos);
    }

    /**
     * @Route("/create", name="api_trabajo_create", methods={"POST"})
     * @param Request $request
     * @return JsonResponse
     */
    public function create(Request $request)
    {
        $content = json_decode($request->getContent(), true);
        dd($content);
        
        $dato1=$content->estudiante_id;
        $dato2=$content->registro;
        $dato3=$content->descripcion;
        try {
            
            $todo = $this->getDoctrine()->getRepository(Trabajo::class, 'default');
            $todo = $this->trabajoRepository->Insertar($dato1,$dato2,$dato3);
            $this->entityManager->persist($todo);
            $this->entityManager->flush();
                
        } catch (Exception $exception) {
            return $this->json([ 
                'message' => ['text'=>['El trabajo no se ha podido registrar!'.$exception] , 'level'=>'error']
                ]);
        }  
        return $this->json($todo);
                      
    }

    /**
     * @Route("/update/{id}", name="api_trabajo_update", methods={"PUT"})
     * @param Request $request
     * @param Trabajo $todo
     * @return JsonResponse
     */
    public function update(Request $request, Trabajo $todo)
    {
        $content = json_decode($request->getContent());
 
        if ($todo->setNombre() === $content->nombre && $todo->getRegistro() === $content->registro && $todo->getDescripcion() === $content->descripcion) {
            return $this->json([
                'message' => 'No hubo cambios'
            ]);
        }

        $todo->setNombre($content->nombre);
        $todo->setRegistro($content->registro);
        $todo->setDescripcion($content->descripcion);
 
        try {
            $this->entityManager->flush();
        } catch (Exception $exception) {
            //error
        }
 
        return $this->json([
            'todo'    => $todo->toArray(),
            'message' => 'todo ha sido actualizado'
        ]);
 
    }

    /**
     * @Route("/delete/{id}", name="api_trabajo_delete")
     * @param Trabajo $todo
     * @return JsonResponse
     */
    public function delete(Trabajo $todo)
    {
        try {
            $this->entityManager->remove($todo);
            $this->entityManager->flush();
        } catch (Exception $exception) {
            //error
        }
 
        return $this->json([
            'message' => 'todo ha sido eliminado'
        ]);
 
    }




    
  
}
