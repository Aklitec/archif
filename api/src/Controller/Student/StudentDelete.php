<?php
/**
 * Created by PhpStorm.
 * User: karim
 * Date: 8/26/18
 * Time: 6:52 PM
 */

namespace App\Controller\Student;


use App\Entity\Student;
use Doctrine\ORM\EntityManagerInterface;

class StudentDelete
{
    private $manager;

    public function __construct(EntityManagerInterface $manager)
    {
        $this->manager = $manager; // not used just for testing ...
    }

    public function __invoke(Student $data) : Student
    {
        return $data->setDeleted(true);
    }
}