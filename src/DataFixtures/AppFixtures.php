<?php /** @noinspection PhpUndefinedVariableInspection */

namespace App\DataFixtures;


use App\Entity\Customers;
use App\Entity\Equipments;
use App\Entity\Invoices;
use App\Entity\Maintenances;
use App\Entity\Pose;
use App\Entity\Quotations;
use App\Entity\Users;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;
use Faker\Factory;
use Symfony\Component\Security\Core\Encoder\UserPasswordEncoderInterface;

class AppFixtures extends Fixture
{
    /**
     * @var UserPasswordEncoderInterface
     */
    private $encoder;

    /**
     * AppFixtures constructor.
     * @param UserPasswordEncoderInterface $encoder
     */
    public function __construct(UserPasswordEncoderInterface $encoder)
    {
        $this->encoder = $encoder;
    }

    /**
     * @param ObjectManager $manager
     */
    public function load(ObjectManager $manager)
    {
        $faker = Factory::create('fr_FR');

        /* Création des clients  */
        for ($c = 0; $c < 30; $c++) {
            $customer = new Customers();
            $customer->setName($faker->company)
                ->setEmail($faker->companyEmail)
                ->setAddress($faker->address)
                ->setCa($faker->randomFloat(2, 250, 35000));
            $manager->persist($customer);
        }

        /*Création de l'administrateur*/
        $user = new Users();
        $hash = $this->encoder->encodePassword($user, "password");
        $user->setRoles((array)'ROLE_ADMIN')
            ->setSector('Manager')
            ->setPassword($hash)
            ->setEmail('admin@savpro.com')
            ->setFirstName('admin')
            ->setLastName('savpro');
        $manager->persist($user);

        /*Création des utilisateurs*/
        for ($c = 0; $c < 30; $c++) {
            $user = new users();
            $chrono = 1;
            $hash = $this->encoder->encodePassword($user, "password");
            $sectors = ['technicien', 'vendeur'];
            $sector = $faker->randomElement($sectors);
            $lastName = $faker->lastName();
            $firstName = $faker->firstName();
            $initial = $firstName{0};
            $lowerInitial = mb_strtolower($initial);
            $lowerLastName = mb_strtolower($lastName);

            /* Enlève les accens aux initiales pour la création du mail */
            $search = array('À', 'Á', 'Â', 'Ã', 'Ä', 'Å', 'Ç', 'È', 'É', 'Ê', 'Ë', 'Ì', 'Í', 'Î', 'Ï', 'Ò', 'Ó', 'Ô',
                'Õ', 'Ö', 'Ù', 'Ú', 'Û', 'Ü', 'Ý', 'à', 'á', 'â', 'ã', 'ä', 'å', 'ç', 'è', 'é', 'ê', 'ë', 'ì', 'í', 'î',
                'ï', 'ð', 'ò', 'ó', 'ô', 'õ', 'ö', 'ù', 'ú', 'û', 'ü', 'ý', 'ÿ');
            $replace = array('A', 'A', 'A', 'A', 'A', 'A', 'C', 'E', 'E', 'E', 'E', 'I', 'I', 'I', 'I', 'O', 'O', 'O',
                'O', 'O', 'U', 'U', 'U', 'U', 'Y', 'a', 'a', 'a', 'a', 'a', 'a', 'c', 'e', 'e', 'e', 'e', 'i', 'i', 'i',
                'i', 'o', 'o', 'o', 'o', 'o', 'o', 'u', 'u', 'u', 'u', 'y', 'y');
            $lowerInitialSa = str_replace($search, $replace, $lowerInitial);


            /* Sélectionne le rôle adéquate. */
            if ($sector === 'technicien') {
                $role = 'ROLE_TECH';
            } else {
                $role = 'ROLE_VENDEUR';
            }

            $user->setFirstName($firstName)
                ->setLastName($lastName)
                ->setPassword($hash)
                ->setEmail($lowerInitialSa . "." . $lowerLastName . '@savpro.com')
                ->setRoles((array)$role)
                ->setSector($sector);
            $manager->persist($user);

            /* tableau d'utilisateurs Techniciens*/
            if ($role === 'ROLE_TECH') {
                $userTech[] = $user;
            }

            /* Création des devis si l'utilisateur est un vendeur */
            if ($sector === 'vendeur') {
                for ($q = 0; $q < mt_rand(5, 20); $q++) {
                    $quotations = new Quotations();
                    $montant = $faker->randomFloat(2, 250, 35000);
                    $statu = $faker->randomElement(['Accepté',
                        'Refusé',
                        'En attente',
                        'Réglé']);
                    $date = $faker->dateTimeBetween('-6 months');
                    $quotations
                        ->setAmount($montant)
                        ->setSentAt($date)
                        ->setStatus($statu)
                        ->setAuthor($user)
                        ->setClient($customer)
                        ->setChrono($chrono);
                    $chrono++;
                    $manager->persist($quotations);
                    /*Création de la facture si le devis est marqué comme Réglé*/
                    if ($statu === 'Réglé') {
                        $chronoInvoices = 1;
                        $invoice = new Invoices();
                        $invoice->setAmount($montant)
                            ->setStatus($faker->randomElement(['En attente de réglement',
                                'Encaissé',
                            ]))
                            ->setSentAt($date)
                            ->setSeller($user)
                            ->setClient($customer)
                            ->setChrono($chronoInvoices);
                        $chronoInvoices++;
                        $manager->persist($invoice);
                    }
                }
            }
            /* Création des produits*/
            for ($eq = 0; $eq < mt_rand(1, 2); $eq++) {
                $produits = new Equipments();
                $images = 'https://picsum.photos/320/200?random=';
                $imageId = $faker->numberBetween(1,99) .'.jpg';
                $imageFaker =($images.$imageId);
                $produits->setName($faker->word)
                    ->setPicture($imageFaker)
                    ->setPrice($faker->numberBetween($min = 300, $max = 9000))
                    ->setRef($faker->ean8)
                    ->setStock($faker->numberBetween($min = 0, $max = 1000));

                $manager->persist($produits);
                /*stockage des produits dans une table*/
                $productsTable[] = $produits;
            }

            /*Création d'une maintenance ou d'un pose si l'utilisateur est un technicien*/
            if ($sector === 'technicien') {
                /*variables de randomisation des utilisateurs et des produits*/
                $user = $userTech[mt_rand(0, count($userTech) - 1)];
                $user2 = $userTech[mt_rand(0, count($userTech) - 1)];
                $productsRandom = $productsTable[mt_rand(0, count($productsTable) - 1)];
                $productsRandom1 = $productsTable[mt_rand(0, count($productsTable) - 1)];

                for ($mt = 0; $mt < mt_rand(3, 10); $mt++) {
                    $maintenance = new Maintenances();
                    $maintenance->setDate($faker->dateTimeBetween('-6 months'))
                        ->addTechnician($user)
                        ->addTechnician($user2)
                        ->addProduct($productsRandom)
                        ->addProduct($productsRandom1);
                    $manager->persist($maintenance);
                }

                /*variables de randomisation des utilisateurs et des produits*/
                $newUser = $userTech[mt_rand(0, count($userTech) - 1)];
                $newUser2 = $userTech[mt_rand(0, count($userTech) - 1)];
                $newProductsRandom = $productsTable[mt_rand(0, count($productsTable) - 1)];
                $newProductsRandom1 = $productsTable[mt_rand(0, count($productsTable) - 1)];
                /*Création des poses*/
                for ($pt = 0; $pt < mt_rand(3, 10); $pt++) {
                    $pose = new Pose();
                    $pose->setDate($faker->dateTimeBetween('-6 months'))
                        ->addProduct($newProductsRandom)
                        ->addProduct($newProductsRandom1)
                        ->addTechnician($newUser)
                        ->addTechnician($newUser2);
                    $manager->persist($pose);
                }

            }

        }
        $manager->flush();
    }
}
