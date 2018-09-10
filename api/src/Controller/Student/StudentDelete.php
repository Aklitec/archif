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
    private $em;

    public function __construct(EntityManagerInterface $em)
    {
        $this->em = $em;
    }

    public function __invoke(Student $data) : Student
    {
        $data->setDeleted(true);
        $data->setDeletedAt(new \DateTime('now'));
        // $data->setDeletedBy()
        $this->em->flush();
        return $data;
    }
}