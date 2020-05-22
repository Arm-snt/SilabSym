<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity(repositoryClass="App\Repository\ElementoRepository")
 */
class Elemento
{
    /**
     * @ORM\Id()
     * @ORM\GeneratedValue()
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @ORM\Column(type="integer")
     */
    private $codelemento;

    /**
     * @ORM\Column(type="string", length=255)
     */
    private $elemento;

    /**
     * @ORM\Column(type="integer")
     */
    private $stock;

    /**
     * @ORM\Column(type="integer")
     */
    private $horauso;

    /**
     * @ORM\Column(type="string", length=255)
     */
    private $categoria;

    /**
     * @ORM\Column(type="string", length=255)
     */
    private $estado;

    /**
     * @ORM\ManyToOne(targetEntity="App\Entity\Laboratorio", inversedBy="elementos")
     * @ORM\JoinColumn(nullable=false)
     */
    private $laboratorio;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getCodelemento(): ?int
    {
        return $this->codelemento;
    }

    public function setCodelemento(int $codelemento): self
    {
        $this->codelemento = $codelemento;

        return $this;
    }

    public function getElemento(): ?string
    {
        return $this->elemento;
    }

    public function setElemento(string $elemento): self
    {
        $this->elemento = $elemento;

        return $this;
    }

    public function getStock(): ?int
    {
        return $this->stock;
    }

    public function setStock(int $stock): self
    {
        $this->stock = $stock;

        return $this;
    }

    public function getHorauso(): ?int
    {
        return $this->horauso;
    }

    public function setHorauso(int $horauso): self
    {
        $this->horauso = $horauso;

        return $this;
    }

    public function getCategoria(): ?string
    {
        return $this->categoria;
    }

    public function setCategoria(string $categoria): self
    {
        $this->categoria = $categoria;

        return $this;
    }

    public function getEstado(): ?string
    {
        return $this->estado;
    }

    public function setEstado(string $estado): self
    {
        $this->estado = $estado;

        return $this;
    }

    public function getLaboratorio(): ?Laboratorio
    {
        return $this->laboratorio;
    }

    public function setLaboratorio(?Laboratorio $laboratorio): self
    {
        $this->laboratorio = $laboratorio;

        return $this;
    }

    public function toArray(){
        return ['id'=>$this->id,'codelemento'=>$this->codelemento,'elemento'=>$this->elemento,'stock'=>$this->stock,'horauso'=>$this->horauso,'categoria'=>$this->categoria,'estado'=>$this->estado];
    }
}
