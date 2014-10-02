angular.module('components.scene.model', ['ces', 'three'])
    .config(function ($componentsProvider) {
        'use strict';

        $componentsProvider.addPreloadData({
            'model': {
                'type': 'box',
                'material': null,
                'mesh': null,
                'receiveShadows': true,
                'castShadows': false
            }
        });
    })
    .factory('ModelSystem', function (System, THREE) {
        'use strict';

        function getPrimitive(type) {
            var geometry;

            if (type === 'box') {
                geometry = new THREE.BoxGeometry(0.5, 0.5, 0.5);
            }

            if (type === 'sphere') {
                geometry = new THREE.SphereGeometry(1);
            }

            if (type === 'circle') {
                geometry = new THREE.CircleGeometry(1);
            }

            if (type === 'cylinder') {
                geometry = new THREE.CylinderGeometry();
            }

            if (type === 'mesh') {
                // TODO: load a json mesh from asset cache
            }

            return geometry;
        }

        var ModelSystem = System.extend({
            addedToWorld: function(world) {
                var sys = this;

                sys._super(world);

                world.entityAdded('model').add(function(entity) {
                    sys.onEntityAdded(entity);
                });
            },
            update: function() {},
            onEntityAdded: function(entity) {

            }
        });

        return ModelSystem;
    });