<?php

namespace App\DataFixtures;

use App\Entity\Equipments;
use App\Entity\Invoices;
use App\Entity\Maintenances;
use App\Entity\Pose;
use App\Entity\Users;
use App\Entity\Quotations;
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
    public function __construct(UserPasswordEncoderInterface $encoder)

    {
        $this->encoder = $encoder;
    }

    public function load(ObjectManager $manager)
    {
        $faker = Factory::create('fr_FR');

/* USERS & Quotations  */
        for( $c= 0; $c < 30; $c++  ){
            $user = new users();
            $chrono = 1;
            $hash = $this->encoder->encodePassword($user, "password");
            $sectors = ['technician','seller'];
            $sector = $faker->randomElement($sectors);
            $lastName = $faker->lastName();
            $firstName = $faker->firstName();
            $initial = $firstName{0};
            $lowerInitial = mb_strtolower($initial);
            $lowerLastName = mb_strtolower($lastName);

            $user  ->setFirstName($firstName)
                            ->setLastName($lastName)
                            ->setPassword($hash)
                            ->setEmail(  $lowerInitial.".".$lowerLastName.'@savpro.com')
                            ->setSector($sector);

            $manager->persist($user);

            if ($sector === 'seller' ){
                for ($q = 0; $q < mt_rand(5,20); $q++){
                    $quotations = new Quotations();
                    $montant = $faker->randomElement(2,250, 35000);
                    $quotations
                        ->setAmount($montant)
                        ->setSentAt($faker->dateTimeBetween('-6 months'))
                        ->setStatus($faker->randomElement(['ACCEPT&Egrave;', 'REFUS&Egrave;', 'EN ATTENTE']))
                        ->setAuthor($user)
                        ->setChrono($chrono);
                    $chrono++;
                    $manager->persist($quotations);
                }
            }

 /*           for ($p = 0; $p < mt_rand(1,2); $p++){
                $pose = New Pose();
                $pose ->setDate($faker->dateTimeBetween('-6 months'));
                $pose ->setUser($user);
            }

            for ($m = 0; $m < mt_rand(1,2); $m++){
                $maintenance = New Maintenances();
                $maintenance->setDate($faker->dateTimeBetween('-6 months'));
            }*/

        }

        $manager->flush();
    }
}
