const path = require('path');
const { LocalAssetStorage } = require('campsi-service-assets');


module.exports = (env) => {

const storages = {
    local: new LocalAssetStorage({
      name: 'local',
      title: 'server',
      dataPath: path.join(__dirname, '..', 'data'),
      baseUrl: env.publicURL + '/assets'
    })
  };

    return {
        port: env.port,
        campsi: {
            mongo: env.mongo,
            publicURL: env.publicURL,
        },
        services: {
            app: {

            },
            assets: {
                options: {
                    getStorage: () => storages.local,
                    storages: storages
                }
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
                                owner: { submitted: '*', published: 'DELETE' },
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