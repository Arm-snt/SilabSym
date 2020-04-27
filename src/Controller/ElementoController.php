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
     * @Route("/read", name="api_elemento_read", methods={"GET"})
     */

    public function read()
    {
        $elementos = $this->elementoRepository->findAll();
        $arrayOfElementos = [];
        foreach ($elementos as $elemento){
            $arrayOfElementos[]=$elemento->toArray();
        }
        return $this->json($arrayOfElementos);
    }

        /**
         * @Route("/create", name="api_elemento_create", methods={"POST"})
         * @param Request $request
         * @return JsonResponse
        */

    public function create(Request $request)
    {
        $content = json_decode($request->getContent());
        $elemento = new Elemento();
        $elemento->setCodElemento($content->codelemento);
        $elemento->setElemento($content->elemento);
        $elemento->setStock($content->Stock);
        $elemento->setHoraUso($content->horauso);
        $elemento->setCategoria($content->categoria);
        $elemento->setEstado($content->estado);

        try{
            $this->entityManager->persist($elemento);
            $this->entityManager->flush();
            return $this->json([
                'elemento'=>$elemento->toArray(),
            ]);
        }catch (Exception $exception){
            //errrorr messaggeeeeeee
        }
    }

        /**
         * @Route("/update", name="api_elemento_update", methods={"PUT"})
         * @param Request $request
         * @param Elemento $elemento
         * @return JsonResponse
        */

    public function update(Request $request, Elemento $elementoRepository)
    {
        $content = json_decode($request->getContent());
        $elemento->setCodElemento($content->codelemento);
        $elemento->setElemento($content->elemento);
        $elemento->setStock($content->Stock);
        $elemento->setHoraUso($content->horauso);
        $elemento->setCategoria($content->categoria);
        $elemento->setEstado($content->estado);

        try{
            $this->entityManager->flush();
        }catch (Exception $exception){
            //errrorr messaggeeeeeee
        }

        return $this->json([
            'message'=>'Elemento Actualizado',
        ]);
    }
    
        /**
         * @Route("/delete/{id}", name="api_elemento_delete", methods={"DELETE"})
         * @param Elemento $elemento
         * @return JsonResponse
        */

    public function delete  (Elemento $elemento )
    {
         try{
            $this->entityManager->remove($elemento);
            $this->entityManager->flush();
        }catch (Exception $exception){
            //errrorr messaggeeeeeee
        }
        return $this->json([
            'message'=>'Elemento Eliminado',
        ]);
    }
    

}
