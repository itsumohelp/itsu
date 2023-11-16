CREATE TABLE IF NOT EXISTS user (
    id VARCHAR(36) PRIMARY KEY,
    name VARCHAR(36),
    email VARCHAR(256) NOT NULL UNIQUE,
    image VARCHAR(256),
    emailVerified DATETIME)
;

CREATE TABLE IF NOT EXISTS account (
    id VARCHAR(36) PRIMARY KEY,
    userid VARCHAR(36) PRIMARY KEY,
    type VARCHAR(36),
    provider VARCHAR(36),
    providerAccountId VARCHAR(36),
    access_token VARCHAR(36),
    expires_at int(11),
    token_type VARCHAR(36),
    scope VARCHAR(256),
    id_token VARCHAR(256),
    session_state VARCHAR(256),
;

CREATE TABLE IF NOT EXISTS session (
    id VARCHAR(36),
    expires DATETIME),
    sessionToken VARCHAR(256),
    userid VARCHAR(36)
;

CREATE TABLE IF NOT EXISTS VerificationToken (
    identifier VARCHAR(36),
    token VARCHAR(256),
    expires DATETIME)
;