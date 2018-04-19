const path = require('path');

module.exports = (env) => {
    return {
        port: env.port,
        campsi: {
            mongo: env.mongo,
            publicURL: env.publicURL,
        },
        services: {
            app: {

            },
            auth: {
                options: {
                    collectionName: '__users__',
                    session: {
                        secret: 'dpomap-auth'
                    },
                    providers: {
                        local: require('campsi-service-auth/lib/providers/local')({
                            baseUrl: env.publicURL + '/auth',
                            salt: env.authEncryptSalt
                        })
                    }
                }
            },
            data: {
                optionsBasePath: path.dirname(path.join(__dirname, '../')),
                options: {
                    roles: { },
                    classes: {
                        approvedEntry: {
                            defaultState: 'published',
                            permissions: {
                                owner: { submitted: '*' },
                                public: { published: 'GET' }
                            },
                            states: {
                                submitted: { name: 'submitted', validate: true },
                                published: { name: 'published', validate: true }
                            }
                        }
                    },
                    resources: {
                        profiles: {
                            class: 'approvedEntry',
                            schema: {
                                type: 'object',
                                additionalProperties: true,
                            }
                        },
                        missions: {
                            class: 'approvedEntry',
                            schema: {
                                type: 'object',
                                additionalProperties: true
                            }
                        }
                    }
                }
            }
        }
    }
}