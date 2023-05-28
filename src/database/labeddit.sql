-- Active: 1684406056916@@127.0.0.1@3306
CREATE TABLE
    users (
        id TEXT PRIMARY KEY UNIQUE NOT NULL,
        nickname TEXT UNIQUE NOT NULL,
        email TEXT UNIQUE NOT NULL,
        password TEXT NOT NULL,
        role TEXT NOT NULL,
        created_at TEXT DEFAULT(DATETIME('now', 'localtime')) NOT NULL
    );

CREATE TABLE
    posts (
        id TEXT PRIMARY KEY UNIQUE NOT NULL,
        creator_id TEXT NOT NULL,
        content TEXT NOT NULL,
        upvotes INTEGER DEFAULT(0) NOT NULL,
        downvotes INTEGER DEFAULT(0) NOT NULL,
        comments INTEGER DEFAULT(0) NOT NULL,
        created_at TEXT DEFAULT(DATETIME('now', 'localtime')) NOT NULL,
        updated_at TEXT DEFAULT(DATETIME('now', 'localtime')) NOT NULL,
        FOREIGN KEY (creator_id) REFERENCES users (id) 
            ON UPDATE CASCADE 
            ON DELETE CASCADE
    );

CREATE TABLE
    comments (
        id TEXT PRIMARY KEY UNIQUE NOT NULL,
        creator_id TEXT NOT NULL,
        post_id TEXT NOT NULL,
        content TEXT NOT NULL,
        upvotes INTEGER DEFAULT(0) NOT NULL,
        downvotes INTEGER DEFAULT(0) NOT NULL,
        created_at TEXT DEFAULT(DATETIME('now', 'localtime')) NOT NULL,
        updated_at TEXT DEFAULT(DATETIME('now', 'localtime')) NOT NULL,
        FOREIGN KEY (creator_id) REFERENCES users (id) 
            ON UPDATE CASCADE 
            ON DELETE CASCADE,
        FOREIGN KEY (post_id) REFERENCES posts (id) 
            ON UPDATE CASCADE  
            ON DELETE CASCADE
    );


CREATE TABLE
    post_vote (
        user_id TEXT NOT NULL,
        post_id TEXT NOT NULL,
        vote BOOLEAN NOT NULL,
        FOREIGN KEY (user_id) REFERENCES users (id) 
            ON UPDATE CASCADE 
            ON DELETE CASCADE,
        FOREIGN KEY (post_id) REFERENCES posts (id) 
            ON UPDATE CASCADE 
            ON DELETE CASCADE
    );

CREATE TABLE
    comment_vote (
        user_id TEXT NOT NULL,
        comment_id TEXT NOT NULL,
        vote BOOLEAN NOT NULL,
        FOREIGN KEY (user_id) REFERENCES users (id) 
            ON UPDATE CASCADE 
            ON DELETE CASCADE,
        FOREIGN KEY (comment_id) REFERENCES comments (id) 
            ON UPDATE CASCADE 
            ON DELETE CASCADE
    );


INSERT INTO 
    users (id, nickname, email, password, role)
    VALUES
    -- tipo ADMIN e senha = lau123
    ("u001", "Lau", "lau@labenu.com.br", "$2a$12$DDF.oOyR1POPkXIV.Is1vOblfX0ywoOAbo945kXLqiGpsHvbSNj2a", "ADMIN"),
    -- tipo USER e senha = yuzo123
    ("u002", "Yuzo", "yuzo@labenu.com.br", "$2a$12$o.CEBJezKmTSKPj9qJuzme1Z8UHphCgcHfIT83eJkelz57P8dzfK.", "USER"),
    -- tipo USER e senha = vini123
    ("u003", "Vini", "vini@labenu.com.br", "$2a$12$ZQvmq9LKuo7./YCwuBD60ea5r5hgGHzr6PDyF.qj4JAYO2b00dR6O", "USER"),
    -- tipo USER e senha = gabi123
    ("u004", "Gabi", "gabi@labenu.com.br", "$2a$12$H10EJelkIvJFEo7cas86pennwFjzN6Q/fUNLqmpvIwIWacuMFtNo.", "USER"),
    -- tipo USER e senha = clara123
    ("u005", "Clara", "clara@labenu.com.br", "$2a$12$G2trYq8JdyIoiPd2jbnOX.lxwTVzYN30rqIDBC4lpnORsP8ksUBTe", "USER"),
    -- tipo USER e senha = luiz123
    ("u006", "Luiz", "luiz@labenu.com.br", "$2a$12$CA.j6YA.zJq9F5E6qT8WKOly56t5pP1aEgwt2Txn5/MDTf5qd9eCm", "USER"),
    -- tipo USER e senha = jessica123
    ("u007", "Jessica", "jessica@labenu.com.br", "$2a$12$noGZJ5hpxFOgUo1gysnMTefNbMoVw65Z2.T3QaqyKhUW.ECYkWWxS", "USER");

INSERT INTO
    posts (id, creator_id, content)
    VALUES
    ("p001", "u004", "!!!CONFIEM NO PPROCESSO!!!"),
    ("p002", "u007", "O teu SIM vai chegar!"),
    ("p003", "u005", "Agora eu quero ver os bugs, vamos debugar!"),
    ("p004", "u002", "Vamos pegar, por exemplo, um usuário chamado Astrodev.");

INSERT INTO
    comments (id, creator_id, post_id, content)
    VALUES
    ("c001", "u006", "p001", "O processo do aprendizado é como montar um quebra-cabeça, dá um nervoso de ver ele incompleto, ansiedade enquanto aida não está pronto, e uma alegria imensa quando tudo se encaixa e você pode olhar para o todo, sabendo do esforço que foi necessário para cada peça."),("c002", "u002", "p003", "Eu devoro bugs no café da manhã!"),
    ("c003", "u001", "p002", "Difícil não se decepcionar com os nãos assim que eles chegam. Porém é lindo rever daqui a 5 ou 10 anos toda a jornada e perceber quanto crescimento houve, quanta evolução pessoal e profissional, especialmente nesses momentos do não, enquanto aguardava o sim."),
    ("c004", "u003", "p004", "Dissem por aí que Yuzo é o Astrodev, porque os dois nunca foram vistos juntos ao mesmo tempo. Confirma aí Yuzo, você é o Astrodev?"),
    ("c005", "u004", "p002", "Amiga, estou aqui!  Amiga, estou aqui!  Se a fase é ruim  E são tantos problemas que não tem fim  Não se esqueça que ouviu de mim  Amiga, estou aqui!  Amiga, estou aqui!");

INSERT INTO
    post_vote (user_id, post_id, vote)
    VALUES
    ("u007", "p001", true),
    ("u001", "p002", true),
    ("u006", "p003", false),
    ("u003", "p004", false),
    ("u002", "p001", true),
    ("u004", "p003", false);

INSERT INTO
    comment_vote (user_id, comment_id, vote)
    VALUES
    ("u001", "c001", true),
    ("u002", "c003", true),
    ("u007", "c002", false),
    ("u006", "c005", false),
    ("u004", "c003", true),
    ("u005", "c004", false);


--UPDATE posts
--SET upvotes = 2, downvotes = 1, comments = 1
--WHERE id = "p001"

--UPDATE comments
--SET upvotes = 2, downvotes = 1
--WHERE id = "c001"


SELECT * FROM users;

SELECT * FROM posts;

SELECT * FROM comments;

SELECT * FROM post_vote;

SELECT * FROM comment_vote;










-- Queries de deleção abaixo:
DROP TABLE comment_vote;
DROP TABLE post_vote;
DROP TABLE comments;
DROP TABLE posts;
DROP TABLE users;
