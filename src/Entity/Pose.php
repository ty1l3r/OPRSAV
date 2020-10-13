<?php

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiResource;
use App\Repository\PoseRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;

/**
 * @ORM\Entity(repositoryClass=PoseRepository::class)
 * @ApiResource(
 *     normalizationContext={"groups"={"pose_read"}},
 *     attributes={
 *     "pagination_items_per_page"=5,
 *     "order": {"date":"ASC"}
 *     }
 *     )
 */
class Pose
{
    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     * @Groups({"pose_read"})
     */
    private $id;

    /**
     * @ORM\ManyToMany(targetEntity=Users::class, inversedBy="poses")
     * @Groups({"pose_read"})
     */
    private $technician;

    /**
     * @ORM\Column(type="datetime")
     * @Groups({"pose_read"})
     */
    private $date;

    /**
     * @ORM\ManyToMany(targetEntity=Equipments::class, inversedBy="poses")
     */
    private $products;

    public function __construct()
    {
        $this->technician = new ArrayCollection();
        $this->products = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    /**
     * @return Collection|Users[]
     */
    public function getTechnician(): Collection
    {
        return $this->technician;
    }

    public function addTechnician(Users $technician): self
    {
        if (!$this->technician->contains($technician)) {
            $this->technician[] = $technician;
        }

        return $this;
    }

    public function removeTechnician(Users $technician): self
    {
        if ($this->technician->contains($technician)) {
            $this->technician->removeElement($technician);
        }

        return $this;
    }

    public function getDate(): ?\DateTimeInterface
    {
        return $this->date;
    }

    public function setDate(\DateTimeInterface $date): self
    {
        $this->date = $date;

        return $this;
    }

    /**
     * @return Collection|Equipments[]
     */
    public function getProducts(): Collection
    {
        return $this->products;
    }

    public function addProduct(Equipments $product): self
    {
        if (!$this->products->contains($product)) {
            $this->products[] = $product;
        }

        return $this;
    }

    public function removeProduct(Equipments $product): self
    {
        if ($this->products->contains($product)) {
            $this->products->removeElement($product);
        }

        return $this;
    }
}
