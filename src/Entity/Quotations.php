<?php

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiResource;
use App\Repository\QuotationsRepository;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;

/**
 * @ORM\Entity(repositoryClass=QuotationsRepository::class)
 * @ApiResource(
 *     normalizationContext={"groups"={"quotations_read"}},
 *     attributes={
 *     "pagination_items_per_page"=20,
 *     "order": {"sentAt":"DESC"},
 *     "pagination_enabled":false
 *     }
 *     )
 */
class Quotations
{
    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @ORM\Column(type="float")
     * @Groups({"quotations_read"})
     */
    private $amount;

    /**
     * @ORM\Column(type="datetime")
     * @Groups({"quotations_read"})
     */
    private $sentAt;

    /**
     * @ORM\Column(type="string", length=50)
     * @Groups({"quotations_read"})
     */
    private $status;


    /**
     * @ORM\Column(type="integer")
     * @Groups({"quotations_read"})
     */
    private $chrono;

    /**
     * @ORM\ManyToOne(targetEntity=Users::class, inversedBy="quotations")
     */
    private $author;

    /**
     * @ORM\ManyToOne(targetEntity=Customers::class, inversedBy="quotations")
     * @ORM\JoinColumn(nullable=true)
     * @Groups({"quotations_read","customers_read" })
     */
    private $client;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getAmount(): ?float
    {
        return $this->amount;
    }

    public function setAmount(float $amount): self
    {
        $this->amount = $amount;

        return $this;
    }

    public function getSentAt(): ?\DateTimeInterface
    {
        return $this->sentAt;
    }

    public function setSentAt(\DateTimeInterface $sentAt): self
    {
        $this->sentAt = $sentAt;

        return $this;
    }

    public function getStatus(): ?string
    {
        return $this->status;
    }

    public function setStatus(string $status): self
    {
        $this->status = $status;

        return $this;
    }


    public function getChrono(): ?int
    {
        return $this->chrono;
    }

    public function setChrono(int $chrono): self
    {
        $this->chrono = $chrono;

        return $this;
    }

    public function getAuthor(): ?Users
    {
        return $this->author;
    }

    public function setAuthor(?Users $author): self
    {
        $this->author = $author;

        return $this;
    }

    public function getClient(): ?Customers
    {
        return $this->client;
    }

    public function setClient(?Customers $client): self
    {
        $this->client = $client;

        return $this;
    }

}
