<?php

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiResource;
use App\Repository\CustomersRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity(repositoryClass=CustomersRepository::class)
 * @ApiResource(
 *    attributes={
 *     "pagination_items_per_page"=10,
 *     "order": {"name":"ASC"}
 *     }
 * )
 */
class Customers
{
    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @ORM\Column(type="string", length=255)
     */
    private $name;

    /**
     * @ORM\Column(type="string", length=255)
     */
    private $email;

    /**
     * @ORM\Column(type="string", length=255)
     */
    private $address;

    /**
     * @ORM\Column(type="integer")
     */
    private $ca;

    /**
     * @ORM\OneToMany(targetEntity=Quotations::class, mappedBy="client", orphanRemoval=true)
     */
    private $quotations;

    /**
     * @ORM\OneToMany(targetEntity=Invoices::class, mappedBy="client", orphanRemoval=true)
     */
    private $invoices;

    public function __construct()
    {
        $this->quotations = new ArrayCollection();
        $this->invoices = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
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

    public function getEmail(): ?string
    {
        return $this->email;
    }

    public function setEmail(string $email): self
    {
        $this->email = $email;

        return $this;
    }

    public function getAddress(): ?string
    {
        return $this->address;
    }

    public function setAddress(string $address): self
    {
        $this->address = $address;

        return $this;
    }

    public function getCa(): ?int
    {
        return $this->ca;
    }

    public function setCa(int $ca): self
    {
        $this->ca = $ca;

        return $this;
    }

    /**
     * @return Collection|Quotations[]
     */
    public function getQuotations(): Collection
    {
        return $this->quotations;
    }

    public function addQuotation(Quotations $quotation): self
    {
        if (!$this->quotations->contains($quotation)) {
            $this->quotations[] = $quotation;
            $quotation->setClient($this);
        }

        return $this;
    }

    public function removeQuotation(Quotations $quotation): self
    {
        if ($this->quotations->contains($quotation)) {
            $this->quotations->removeElement($quotation);
            // set the owning side to null (unless already changed)
            if ($quotation->getClient() === $this) {
                $quotation->setClient(null);
            }
        }

        return $this;
    }

    /**
     * @return Collection|Invoices[]
     */
    public function getInvoices(): Collection
    {
        return $this->invoices;
    }

    public function addInvoice(Invoices $invoice): self
    {
        if (!$this->invoices->contains($invoice)) {
            $this->invoices[] = $invoice;
            $invoice->setClient($this);
        }

        return $this;
    }

    public function removeInvoice(Invoices $invoice): self
    {
        if ($this->invoices->contains($invoice)) {
            $this->invoices->removeElement($invoice);
            // set the owning side to null (unless already changed)
            if ($invoice->getClient() === $this) {
                $invoice->setClient(null);
            }
        }

        return $this;
    }
}
