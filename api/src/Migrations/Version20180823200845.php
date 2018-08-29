<?php declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20180823200845 extends AbstractMigration
{
    public function up(Schema $schema) : void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'postgresql', 'Migration can only be executed safely on \'postgresql\'.');

        $this->addSql('CREATE SEQUENCE study_level_id_seq INCREMENT BY 1 MINVALUE 1 START 1');
        $this->addSql('CREATE SEQUENCE certificate_id_seq INCREMENT BY 1 MINVALUE 1 START 1');
        $this->addSql('CREATE SEQUENCE student_id_seq INCREMENT BY 1 MINVALUE 1 START 1');
        $this->addSql('CREATE TABLE study_level (id INT NOT NULL, name VARCHAR(255) NOT NULL, PRIMARY KEY(id))');
        $this->addSql('CREATE TABLE certificate (id INT NOT NULL, created_by_id INT NOT NULL, code VARCHAR(255) NOT NULL, number INT NOT NULL, created_at TIMESTAMP(0) WITHOUT TIME ZONE NOT NULL, PRIMARY KEY(id))');
        $this->addSql('CREATE INDEX IDX_219CDA4AB03A8386 ON certificate (created_by_id)');
        $this->addSql('CREATE TABLE student (id INT NOT NULL, study_level_id INT NOT NULL, deleted_by_id INT DEFAULT NULL, code VARCHAR(255) NOT NULL, first_name VARCHAR(255) NOT NULL, last_name VARCHAR(255) NOT NULL, cne VARCHAR(255) NOT NULL, birth_place VARCHAR(255) DEFAULT NULL, birth_date DATE DEFAULT NULL, stop_date DATE DEFAULT NULL, comments VARCHAR(255) DEFAULT NULL, created_at TIMESTAMP(0) WITHOUT TIME ZONE NOT NULL, updated_at TIMESTAMP(0) WITHOUT TIME ZONE NOT NULL, deleted BOOLEAN NOT NULL, deleted_at TIMESTAMP(0) WITHOUT TIME ZONE DEFAULT NULL, PRIMARY KEY(id))');
        $this->addSql('CREATE INDEX IDX_B723AF33FC385E2E ON student (study_level_id)');
        $this->addSql('CREATE INDEX IDX_B723AF33C76F1F52 ON student (deleted_by_id)');
        $this->addSql('ALTER TABLE certificate ADD CONSTRAINT FK_219CDA4AB03A8386 FOREIGN KEY (created_by_id) REFERENCES student (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE student ADD CONSTRAINT FK_B723AF33FC385E2E FOREIGN KEY (study_level_id) REFERENCES study_level (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE student ADD CONSTRAINT FK_B723AF33C76F1F52 FOREIGN KEY (deleted_by_id) REFERENCES student (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
    }

    public function down(Schema $schema) : void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'postgresql', 'Migration can only be executed safely on \'postgresql\'.');

        $this->addSql('CREATE SCHEMA public');
        $this->addSql('ALTER TABLE student DROP CONSTRAINT FK_B723AF33FC385E2E');
        $this->addSql('ALTER TABLE certificate DROP CONSTRAINT FK_219CDA4AB03A8386');
        $this->addSql('ALTER TABLE student DROP CONSTRAINT FK_B723AF33C76F1F52');
        $this->addSql('DROP SEQUENCE study_level_id_seq CASCADE');
        $this->addSql('DROP SEQUENCE certificate_id_seq CASCADE');
        $this->addSql('DROP SEQUENCE student_id_seq CASCADE');
        $this->addSql('DROP TABLE study_level');
        $this->addSql('DROP TABLE certificate');
        $this->addSql('DROP TABLE student');
    }
}
