<?php

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiResource;
use ApiPlatform\Core\Annotation\ApiSubresource;
use App\Repository\UsersRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Security\Core\User\UserInterface;
use Symfony\Component\Serializer\Annotation\Groups;
use Symfony\Component\Validator\Constraints as Assert;

/**
 * @ORM\Entity(repositoryClass=UsersRepository::class)
 * @ApiResource(
 *     denormalizationContext={"disable_type_enforcement"=true},
 *     attributes={"order": {"lastName":"ASC"}},
 *      subresourceOperations={
 *          "invoices_get_subresource"= { "path"="/collaborateur/{id}/factures"},
 *          "quotations_get_subresource"= { "path"="/collaborateur/{id}/devis"}
 *      }
 *     )
 */
class Users implements UserInterface
{
    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @ORM\Column(type="string", length=180, unique=true)
     * @Assert\NotBlank(message="L'email est obligatoire")
     * @Assert\Email(
     *     message = "L'email'{{ value }}' n'est pas valide.",
     *     checkMX = true
     * )
     */
    private $email;

    /**
     * @ORM\Column(type="json")
     * @Assert\NotBlank(message="L'ajout d'un rôle est obligatoire")
     * @ApiSubresource
     */
    private $roles = [];

    /**
     * @var string The hashed password
     * @ORM\Column(type="string")
     * @Assert\NotBlank(message="vous devez choisir un mot de passe")
     */
    private $password;

    /**
     * @ORM\Column(type="string", length=100)
     * @Groups({"users_read"})
     * @Assert\NotBlank(message="N'oubliez pas le prénom")
     * @Assert\Length(
     *      min = 2,
     *      max = 50,
     *      minMessage = "Le prénom doit avoir au moins {{ limit }} lettres",
     *      maxMessage = "Le prénom ne doit pas faire plus de {{ limit }} lettres",
     *      allowEmptyString = false
     * )
     */
    private $firstName;

    /**
     * @ORM\Column(type="string", length=100)
     * @Groups({"users_read"})
     * @Assert\NotBlank(message="N'oubliez pas le nom de famille")
     * @Assert\Length(
     *      min = 2,
     *      max = 50,
     *      minMessage = "Le nom doit avoir au moins {{ limit }} lettres",
     *      maxMessage = "Le nom ne doit pas faire plus de {{ limit }} lettres",
     *      allowEmptyString = false
     * )
     */
    private $lastName;

    /**
     * @ORM\Column(type="string", length=100)
     * @Groups({"users_read"})
     * @Assert\NotBlank(message="La selection d'un secteur est obligatoire")
     */
    private $sector;

    /**
     * @ORM\OneToMany(targetEntity=Quotations::class, mappedBy="author")
     * @ApiSubresource()
     */
    private $quotations;

    /**
     * @ORM\OneToMany(targetEntity=Invoices::class, mappedBy="seller")
     * @ApiSubresource()
     */
    private $invoices;

    /**
     * @ORM\ManyToMany(targetEntity=Maintenances::class, mappedBy="technician")
     */
    private $maintenances;

    /**
     * @ORM\ManyToMany(targetEntity=Pose::class, mappedBy="technician")
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

    public function getEmail(): ?string
    {
        return $this->email;
    }

    public function setEmail(string $email): self
    {
        $this->email = $email;

        return $this;
    }

    /**
     * A visual identifier that represents this user.
     *
     * @see UserInterface
     */
    public function getUsername(): string
    {
        return (string)$this->email;
    }

    /**
     * @see UserInterface
     */
    public function getRoles(): array
    {
        $roles = $this->roles;
        $roles[] = 'ROLE_USER';

        return array_unique($roles);
    }

    public function setRoles(array $roles): self
    {
        $this->roles = $roles;

        return $this;
    }

    /**
     * @see UserInterface
     */
    public function getPassword(): string
    {
        return (string)$this->password;
    }

    public function setPassword(string $password): self
    {
        $this->password = $password;

        return $this;
    }

    /**
     * @see UserInterface
     */
    public function getSalt()
    {
        // not needed when using the "bcrypt" algorithm in security.yaml
    }

    /**
     * @see UserInterface
     */
    public function eraseCredentials()
    {
        // If you store any temporary, sensitive data on the user, clear it here
        // $this->plainPassword = null;
    }

    public function getFirstName(): ?string
    {
        return $this->firstName;
    }

    public function setFirstName(string $firstName): self
    {
        $this->firstName = $firstName;

        return $this;
    }

    public function getLastName(): ?string
    {
        return $this->lastName;
    }

    public function setLastName(string $lastName): self
    {
        $this->lastName = $lastName;

        return $this;
    }

    public function getSector(): ?string
    {
        return $this->sector;
    }

    public function setSector(string $sector): self
    {
        $this->sector = $sector;

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
            $quotation->setAuthor($this);
        }

        return $this;
    }

    public function removeQuotation(Quotations $quotation): self
    {
        if ($this->quotations->contains($quotation)) {
            $this->quotations->removeElement($quotation);
            // set the owning side to null (unless already changed)
            if ($quotation->getAuthor() === $this) {
                $quotation->setAuthor(null);
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
            $invoice->setSeller($this);
        }

        return $this;
    }

    public function removeInvoice(Invoices $invoice): self
    {
        if ($this->invoices->contains($invoice)) {
            $this->invoices->removeElement($invoice);
            // set the owning side to null (unless already changed)
            if ($invoice->getSeller() === $this) {
                $invoice->setSeller(null);
            }
        }

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
            $maintenance->addTechnician($this);
        }

        return $this;
    }

    public function removeMaintenance(Maintenances $maintenance): self
    {
        if ($this->maintenances->contains($maintenance)) {
            $this->maintenances->removeElement($maintenance);
            $maintenance->removeTechnician($this);
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
            $pose->addTechnician($this);
        }

        return $this;
    }

    public function removePose(Pose $pose): self
    {
        if ($this->poses->contains($pose)) {
            $this->poses->removeElement($pose);
            $pose->removeTechnician($this);
        }

        return $this;
    }


}
