print('Start #################################################################');

db.createUser(
        {
            user: "taUsr",
            pwd: "taPwd",
            roles: [
                {
                    role: "readWrite",
                    db: "ta"
                }
            ]
        }
);

db.getUsers()

print('END #################################################################');
