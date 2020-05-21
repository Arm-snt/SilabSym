<?php

namespace App\Controller;
use App\Entity\Estudiante;
use App\Repository\EstudianteRepository;
use Doctrine\DBAL\Exception\UniqueConstraintViolationException;
use Doctrine\ORM\EntityManagerInterface;
use Exception;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;

  /**
 * @Route("/api/estudiante", name="api_estudiante")
 */
class EstudianteController extends AbstractController
{
    private $entityManager;
    private $estudianteRepository;
 
    public function __construct(EntityManagerInterface $entityManager, EstudianteRepository $estudianteRepository)
    {
        $this->entityManager = $entityManager;
        $this->estudianteRepository = $estudianteRepository;
    }

    /**
     * @Route("/create", name="api_estudiante_create", methods={"POST"})
     * @param Request $request
     * @return JsonResponse
     */
    
    public function create(Request $request)
    {
        $content = json_decode($request->getContent());

        $todo = new Estudiante();
        $todo->setCodigo($content->codigo);
        $todo->setNombre($content->nombre);
        $todo->setPrograma($content->programa);

        try {
            $this->entityManager->persist($todo);
            $this->entityManager->flush();

        } catch (Exception $exception) {
            return $this->json([ 
                'message' => ['text'=>['El Estudiante no se ha podido registrar!'.$exception] , 'level'=>'error']
                ]);
        }  

        return $this->json([ 
            'todo' => $todo->toArray(),
            'message' => ['text'=>['El Estudiante: '.$content->nombre, ', se ha registrado!'] , 'level'=>'success']
            ]);

    }

    /**
     * @Route("/read", name="api_estudiante_read", methods={"GET"})
     */
    public function read()
    {
        $todos = $this->estudianteRepository->findAll();
        $arrayOfTodos = [];
        foreach ($todos as $todo){
            $arrayOfTodos[] = $todo->toArray();
        }
        return $this->json($arrayOfTodos);
        
    }

    /**
     * @Route("/update/{id}", name="api_estudiante_update", methods={"PUT"})
     * @param Request $request
     * @param Estudiante $todo
     * @return JsonResponse
     */
    public function update(Request $request, Estudiante $todo)
    {
        $content = json_decode($request->getContent());
 
        if ($todo->getCodigo() === $content->codigo && $todo->getNombre() === $content->nombre && $todo->getPrograma() === $content->programa) {
            return $this->json([                
                'message' => ['text'=>['No se realizaron cambios al estudiante: '.$todo->getNombre()] , 'level'=>'warning']
            ]);
        }

        $todo->setCodigo($content->codigo);
        $todo->setNombre($content->nombre);
        $todo->setPrograma($content->programa);
 
        try {
            $this->entityManager->flush();
        } catch (Exception $exception) {
            return $this->json([ 
                'message' => ['text'=>['No se pudo acceder a la Base de datos mientras se actualizaba al estudiante!'] , 'level'=>'error']
                ]);
        }
 
        return $this->json([
            'todo'    => $todo->toArray(),
            'message' => ['text'=>['Se ha actualizado la informacion del Estudiante: '.$content->nombre] , 'level'=>'success']
        ]);
 
    }

    /**
     * @Route("/delete/{id}", name="api_estudiante_delete", methods={"DELETE"})
     * @param Request $request
     * @param Estudiante $todo
     * @return JsonResponse
     */
    public function delete(Request $request,Estudiante $todo)
    {
        $content = json_decode($request->getContent());

        try {
            $this->entityManager->remove($todo);
            $this->entityManager->flush();
        } catch (Exception $exception) {
            return $this->json([ 
                'message' => ['text'=>['No se pudo acceder a la Base de datos mientras se eliminaba al estudiante!'] , 'level'=>'error']
                ]);
        }
 
        return $this->json([
            'message' => ['text'=>['Se ha eliminado la informacion del Estudiante: '.$todo->getNombre()] , 'level'=>'success']
        ]);
 
    }

}
