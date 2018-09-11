<?php
namespace App\Security;

use App\Entity\User;
use Symfony\Component\Security\Core\User\UserCheckerInterface;
use Symfony\Component\Security\Core\User\UserInterface;
use Symfony\Component\Security\Core\Exception\AuthenticationException;

class UserChecker implements UserCheckerInterface
{
    public function checkPreAuth(UserInterface $user) : void
    {
        if (!$user instanceof User) {
            return;
        }
        // user account is not active, the user may be notified
        if (!$user->getIsActive()) {
            throw new AuthenticationException('User.not_active');
        }
    }

    public function checkPostAuth(UserInterface $user) : void
    {
        if (!$user instanceof User) {
            return;
        }
    }
}
