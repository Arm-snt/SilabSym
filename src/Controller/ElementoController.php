<?php

namespace App\Controller;
use App\Entity\Elemento;
use App\Repository\ElementoRepository;
use Doctrine\DBAL\Exception\UniqueConstraintViolationException;
use Doctrine\ORM\EntityManagerInterface;
use Exception;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;


    /**
     * @Route("/api/elemento", name="api_elemento")
     */

class ElementoController extends AbstractController
{
    private $entityManager;
    private $elementoRepository;
 
    public function __construct(EntityManagerInterface $entityManager, ElementoRepository $elementoRepository){

        $this->entityManager = $entityManager;
        $this->elementoRepository = $elementoRepository;
    }

    /**
     * @Route("/create", name="api_elemento_create", methods={"POST"})
     * @param Request $request
     * @return JsonResponse
    */

    public function create(Request $request)
    {
        $content = json_decode($request->getContent());

        $todo = new Elemento();
        $todo->setCodElemento($content->codelemento);
        $todo->setElemento($content->elemento);
        $todo->setStock($content->stock);
        $todo->setHoraUso($content->horauso);
        $todo->setCategoria($content->categoria);
        $todo->setEstado($content->estado);

        try{
            $this->entityManager->persist($todo);
            $this->entityManager->flush();
        }catch (Exception $exception){
            return $this->json([ 
                'message' => ['text'=>['El Elemento no se ha podido registrar!'.$exception] , 'level'=>'error']
                ]);
        }

        return $this->json([ 
            'todo' => $todo->toArray(),
            'message' => ['text'=>['El Elemento: '.$content->elemento, ', se ha registrado!'] , 'level'=>'success']
            ]);

    }

    /**
     * @Route("/read", name="api_elemento_read", methods={"GET"})
     */

    public function read()
    {
        $todos = $this->elementoRepository->findAll();
        $arrayOfTodos = [];
        foreach ($todos as $todo){
            $arrayOfTodos[]=$todo->toArray();
        }
        return $this->json($arrayOfTodos);
    }

    /**
     * @Route("/update/{id}", name="api_elemento_update", methods={"PUT"})
     * @param Request $request
     * @param Elemento $todo
     * @return JsonResponse
    */

    public function update(Request $request, Elemento $todo)
    {
        $content = json_decode($request->getContent());

        if($todo->getCodElemento()===$content->codelemento && $todo->getElemento()===$content->elemento && $todo->getStock()===$content->stock && $todo->getHoraUso()===$content->horauso && $todo->getCategoria()===$content->categoria && $todo->getEstado()===$content->estado){
            return $this->json([                
                'message' => ['text'=>['No se realizaron cambios al elemento: '.$todo->getElemento()] , 'level'=>'warning']
            ]);
        }

        $todo->setCodElemento($content->codelemento);
        $todo->setElemento($content->elemento);
        $todo->setStock($content->stock);
        $todo->setHoraUso($content->horauso);
        $todo->setCategoria($content->categoria);
        $todo->setEstado($content->estado);

        try{
            $this->entityManager->flush();
        }catch (Exception $exception){
            return $this->json([ 
                'message' => ['text'=>['No se pudo acceder a la Base de datos mientras se actualizaba al elemento!'] , 'level'=>'error']
                ]);
            }
        return $this->json([
            'todo'    => $todo->toArray(),
            'message' => ['text'=>['Se ha actualizado la informacion del Elemento: '.$content->elemento] , 'level'=>'success']
        ]);
    }
    
    /**
     * @Route("/delete/{id}", name="api_elemento_delete", methods={"DELETE"})
     * @param Request $request
     * @param Elemento $todo
     * @return JsonResponse
    */

    public function delete  (Request $request,Elemento $todo )
    {
        $content = json_decode($request->getContent());

         try{
            $this->entityManager->remove($todo);
            $this->entityManager->flush();
        }catch (Exception $exception){
            return $this->json([ 
                'message' => ['text'=>['No se pudo acceder a la Base de datos mientras se eliminaba el elemento!'] , 'level'=>'error']
                ]);
        }
        return $this->json([
            'message' => ['text'=>['Se ha eliminado el registro del elemento: '.$todo->getElemento()] , 'level'=>'success']
        ]);
    }
    

}
