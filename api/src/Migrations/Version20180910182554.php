<?php declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20180910182554 extends AbstractMigration
{
    public function up(Schema $schema) : void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'postgresql', 'Migration can only be executed safely on \'postgresql\'.');

        $this->addSql('ALTER TABLE "user" ADD full_name VARCHAR(255) DEFAULT NULL');
        $this->addSql('ALTER TABLE "user" ADD roles TEXT DEFAULT NULL');
        $this->addSql('ALTER TABLE "user" ADD password_requested_at TIMESTAMP(0) WITHOUT TIME ZONE DEFAULT NULL');
        $this->addSql('ALTER TABLE "user" ADD confirmation_token VARCHAR(255) DEFAULT NULL');
        $this->addSql('ALTER TABLE "user" ALTER username TYPE VARCHAR(255)');
        $this->addSql('ALTER TABLE "user" ALTER email TYPE VARCHAR(255)');
        $this->addSql('ALTER TABLE "user" ALTER password TYPE VARCHAR(255)');
        $this->addSql('COMMENT ON COLUMN "user".roles IS \'(DC2Type:array)\'');
    }

    public function down(Schema $schema) : void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'postgresql', 'Migration can only be executed safely on \'postgresql\'.');

        $this->addSql('CREATE SCHEMA public');
        $this->addSql('ALTER TABLE "user" DROP full_name');
        $this->addSql('ALTER TABLE "user" DROP roles');
        $this->addSql('ALTER TABLE "user" DROP password_requested_at');
        $this->addSql('ALTER TABLE "user" DROP confirmation_token');
        $this->addSql('ALTER TABLE "user" ALTER email TYPE VARCHAR(60)');
        $this->addSql('ALTER TABLE "user" ALTER username TYPE VARCHAR(25)');
        $this->addSql('ALTER TABLE "user" ALTER password TYPE VARCHAR(64)');
    }
}
