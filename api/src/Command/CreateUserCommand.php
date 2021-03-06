<?php

namespace App\Command;

use Symfony\Component\Console\Input\InputArgument;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Output\OutputInterface;
use Symfony\Component\Console\Question\Question;
use Symfony\Component\Console\Command\Command;
use Symfony\Component\Security\Core\Encoder\UserPasswordEncoderInterface;
use Doctrine\ORM\EntityManagerInterface;
use App\Entity\User;
use Symfony\Component\Validator\Validator\ValidatorInterface;
use Symfony\Component\Validator\Exception\ValidatorException ;

class CreateUserCommand extends Command
{
    private $em;

    private $passwordEncoder;

    private $validator;

    public function __construct(UserPasswordEncoderInterface $passwordEncoder, EntityManagerInterface $em, ValidatorInterface $validator)
    {
        $this->em = $em;
        $this->passwordEncoder = $passwordEncoder;
        $this->validator = $validator;

        parent::__construct();
    }

    protected function configure() : void
    {
        $this
            ->setName('app:user:create')
            ->setDescription('Create a user.')
            ->setDefinition(array(
                new InputArgument('username', InputArgument::REQUIRED, 'The username'),
                new InputArgument('email', InputArgument::REQUIRED, 'The email'),
                new InputArgument('password', InputArgument::REQUIRED, 'The password'),
                new InputArgument('fullName', InputArgument::OPTIONAL, 'User fullName'),
            ))
            ;
    }

    /**
     *      * {@inheritdoc}
     *           */
    protected function execute(InputInterface $input, OutputInterface $output)
    {
        $user = new User();

        $username = $input->getArgument('username');

        $email = $input->getArgument('email');

        $password = $input->getArgument('password');
        $password = $this->passwordEncoder->encodePassword($user, $password);

        $fullName = $input->getArgument('fullName');

        $user->setUsername($username);
        $user->setEmail($email);
        $user->setPassword($password);
        $user->setFullName($fullName);

        $errors = $this->validator->validate($user);

        if (\count($errors) > 0) {
            $errorsString = (string) $errors;
            throw new ValidatorException($errorsString);
        }


        $this->em->persist($user);
        $this->em->flush();

        $output->writeln(sprintf('Created user %s', $username));
    }

    /**
     *      * {@inheritdoc}
     *           */
    protected function interact(InputInterface $input, OutputInterface $output) : void
    {
        $questions = array();

        if (!$input->getArgument('username')) {
            $question = new Question('Please choose a username:');
            $questions['username'] = $question;
        }

        if (!$input->getArgument('email')) {
            $question = new Question('Please choose an email:');
            $questions['email'] = $question;
        }

        if (!$input->getArgument('password')) {
            $question = new Question('Please choose a password:');
            $question->setHidden(true);
            $question->setHiddenFallback(false);
            $questions['password'] = $question;
        }

        foreach ($questions as $name => $question) {
            $answer = $this->getHelper('question')->ask($input, $output, $question);
            $input->setArgument($name, $answer);
        }
    }
}
