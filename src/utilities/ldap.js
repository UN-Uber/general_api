import ldap from 'ldapjs';

export const client = () => {
	const client = ldap.createClient({
        url: ['ldap://34.68.136.52:389'],
        reconnect: true
    });
    client.bind('cn=admin,dc=unuber,dc=unal,dc=edu,dc=co', 'admin', function (err) {
        if(err){
            console.log(err);
        }
    });
    return client;
};

export function comparePassword(cn, password, client) {
	return new Promise((resolve, reject) => {
        const cnWithoutDomain = cn.split('@')[0];
		client.compare(`cn=${cnWithoutDomain},ou=sa ,dc=unuber,dc=unal,dc=edu,dc=co`,"userPassword",password,(err, res) => {
				if (err) {
					console.log(err);
					reject(err);
				} else {
					resolve(res);
				}
			}
		);
	});
}

export function getLastUID(client) {
	return new Promise((resolve, reject) => {
		var opts = {
			filter: "(objectClass=*)",
			scope: "sub",
			attributes: ["uidNumber", "cn"],
		};
		var uidArray = [];
		client.search("ou=sa,dc=unuber,dc=unal,dc=edu,dc=co",opts,(err, res) => {
				if (err) {
					console.log(err);
				} else {
					res.on("searchEntry", (entry) => {
						uidArray.push(parseInt(entry.object.uidNumber));

					});

					res.on("error", (err) => {
						console.error("error: " + err.message);
                        reject(err);
					});
					res.on("end", (result) => {
                        resolve(uidArray[uidArray.length - 1]);
					});
				}
			}
		);
	});
}

export function addUser(client, username, password, uidN){
    return new Promise((resolve, reject) => {
        const userWithoutDomain = username.split('@')[0];
        const entry = {
            cn: username,
            sn: userWithoutDomain,
            uid: userWithoutDomain,
            uidNumber: uidN,
            gidNumber: '500',
            objectclass: ['inetOrgPerson', 'posixAccount', 'top'],
            homeDirectory: `/home/users/${userWithoutDomain}`,
            userPassword: password
        };

        client.add(`cn=${userWithoutDomain},ou=sa ,dc=unuber,dc=unal,dc=edu,dc=co`, entry, (err) => {
            if(err){
                console.log(err);
                reject(err);
            }
            else{
                resolve(true);
            }
        });
    });
}

export function checkIfExist(client, cn){
    return new Promise((resolve, reject) => {
        var opts = {
            filter: `(cn=${cn})`,
            scope: 'sub',
            attributes: ['sn', 'cn']
        }

        client.search("ou=sa,dc=unuber,dc=unal,dc=edu,dc=co", opts, (err, res) => {
            if(err){
                console.log(err);
                reject(err);
            }
            else{
                res.on("searchEntry", (entry) => {
                    resolve(true);
                });
                res.on("error", (err) => {
                    console.error("error: " + err.message);
                    reject(err);
                });
                res.on("end", (result) => {
                    resolve(false);
                });
            }
        });
    });
}

