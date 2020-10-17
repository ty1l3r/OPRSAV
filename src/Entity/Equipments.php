<?php

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiResource;
use App\Repository\EquipmentsRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;

/**
 * @ORM\Entity(repositoryClass=EquipmentsRepository::class)
 * @ApiResource(
 *     normalizationContext={"groups"={"equipments_read"}},
 *     attributes={
 *     "order": {"name":"ASC"}
 *     }
 *     )
 */
class Equipments
{
    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     * @Groups({"equipments_read"})
     */
    private $id;

    /**
     * @ORM\Column(type="string", length=255)
     * @Groups({"equipments_read"})
     */
    private $ref;

    /**
     * @ORM\Column(type="string", length=255)
     * @Groups({"equipments_read"})
     */
    private $picture;


    /**
     * @ORM\Column(type="string", length=255)
     * @Groups({"equipments_read"})
     */
    private $name;

    /**
     * @ORM\Column(type="float")
     * @Groups({"equipments_read"})
     */
    private $price;

    /**
     * @ORM\Column(type="integer")
     * @Groups({"equipments_read"})
     *
     */
    private $stock;

    /**
     * @ORM\ManyToMany(targetEntity=Maintenances::class, mappedBy="products")
     */
    private $maintenances;

    /**
     * @ORM\ManyToMany(targetEntity=Pose::class, mappedBy="products")
     */
    private $poses;

    public function __construct()
    {
        $this->maintenances = new ArrayCollection();
        $this->poses = new ArrayCollection();
    }


    public function getId(): ?int
    {
        return $this->id;
    }

    public function getRef(): ?string
    {
        return $this->ref;
    }

    public function setRef(string $ref): self
    {
        $this->ref = $ref;

        return $this;
    }

    public function getPicture(): ?string
    {
        return $this->picture;
    }

    public function setPicture(string $picture): self
    {
        $this->picture = $picture;

        return $this;
    }

    public function getName(): ?string
    {
        return $this->name;
    }

    public function setName(string $name): self
    {
        $this->name = $name;

        return $this;
    }

    public function getPrice(): ?float
    {
        return $this->price;
    }

    public function setPrice(float $price): self
    {
        $this->price = $price;

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

    /**
     * @return Collection|Maintenances[]
     */
    public function getMaintenances(): Collection
    {
        return $this->maintenances;
    }

    public function addMaintenance(Maintenances $maintenance): self
    {
        if (!$this->maintenances->contains($maintenance)) {
            $this->maintenances[] = $maintenance;
            $maintenance->addProduct($this);
        }

        return $this;
    }

    public function removeMaintenance(Maintenances $maintenance): self
    {
        if ($this->maintenances->contains($maintenance)) {
            $this->maintenances->removeElement($maintenance);
            $maintenance->removeProduct($this);
        }

        return $this;
    }

    /**
     * @return Collection|Pose[]
     */
    public function getPoses(): Collection
    {
        return $this->poses;
    }

    public function addPose(Pose $pose): self
    {
        if (!$this->poses->contains($pose)) {
            $this->poses[] = $pose;
            $pose->addProduct($this);
        }

        return $this;
    }

    public function removePose(Pose $pose): self
    {
        if ($this->poses->contains($pose)) {
            $this->poses->removeElement($pose);
            $pose->removeProduct($this);
        }

        return $this;
    }


}
