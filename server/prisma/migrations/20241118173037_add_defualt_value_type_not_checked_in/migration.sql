-- AlterTable
ALTER TABLE `CheckIn` MODIFY `attendTime` DATETIME(3) NULL,
    MODIFY `type` ENUM('NORMAL', 'SICK_LEAVE', 'PERSONAL_LEAVE', 'NOT_CHECKED_IN', 'ABSENT', 'FORGOT_TO_CHECK_IN', 'HOLIDAY', 'CLOSED_FOR_CHECK_IN') NOT NULL DEFAULT 'NOT_CHECKED_IN';
