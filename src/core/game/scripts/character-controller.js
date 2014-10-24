angular.module('game.scripts.character-controller', ['components.script'])
    .run(function ($log, ScriptBank, IbConfig) {
        'use strict';

        var moveSpeed = 0.01;
        var rotateSpeed = 0.003;

        var bind = function (scope, fn) {
            return function () {
                fn.apply(scope, arguments);
            };
        };

        var CharacterControllerScript = function (entity, world) {
            var me = this;

            this.entity = entity;
            this.world = world;

            var input = this.world.getSystem('input');
            input.keyboard.registerCombos([{
                keys: 'up w',
                'prevent_repeat': true,
                'on_keydown': function () {
                    me.moveForward = true;
                },
                'on_keyup': function () {
                    me.moveForward = false;
                }
            },
            {
                keys: 'down s',
                'prevent_repeat': true,
                'on_keydown': function () {
                    me.moveBackward = true;
                },
                'on_keyup': function () {
                    me.moveBackward = false;
                }
            },{
                keys: 'left a',
                'prevent_repeat': true,
                'on_keydown': function () {
                    me.moveLeft = true;
                },
                'on_keyup': function () {
                    me.moveLeft = false;
                }
            },{
                keys: 'right d',
                'prevent_repeat': true,
                'on_keydown': function () {
                    me.moveRight = true;
                },
                'on_keyup': function () {
                    me.moveRight = false;
                }
            },{
                keys: 'q',
                'prevent_repeat': true,
                'on_keydown': function () {
                    me.rotateLeft = true;
                },
                'on_keyup': function () {
                    me.rotateLeft = false;
                }
            },{
                keys: 'e',
                'prevent_repeat': true,
                'on_keydown': function () {
                    me.rotateRight = true;
                },
                'on_keyup': function () {
                    me.rotateRight = false;
                }
            }]);

            me.moveForward = false;
            me.moveBackward = false;
            me.moveLeft = false;
            me.moveRight = false;

            me.rotateLeft = false;
            me.rotateRight = false;
        };

        CharacterControllerScript.prototype.destroy = function () {
            // prolly don't want to reset all input all the time...
            this.world.getSystem('input').keyboard.reset();
        };

        CharacterControllerScript.prototype.update = function (dt, elapsed, timestamp) {

            // this script should be attached to an entity with a camera component....
            // var cameraComponent = this.entity.getComponent('camera');



            // if (!cameraComponent) {
            //     // throw error?weqq2hh
            //     return;
            // }

            // console.log(this.moveForward);

            if (this.moveForward) {
                this.entity.translateZ(-moveSpeed * dt);
            }
            if (this.moveBackward) {
                this.entity.translateZ(moveSpeed * dt);
            }
            if (this.moveLeft) {
                this.entity.rotateY(rotateSpeed * dt);
            }
            if (this.moveRight) {
                this.entity.rotateY(-rotateSpeed * dt);
            }

            if (this.rotateLeft) {
                this.entity.translateX(-moveSpeed * dt);
            }
            if (this.rotateRight) {
                this.entity.translateX(moveSpeed * dt);
            }
            // if (this.rotateRight) {
            //     this.entity.translateX( moveSpeed * dt );
            // }


            // cameraComponent.camera.position.set(Math.cos(timestamp / 1000) * 10, 20, Math.sin(timestamp / 1000) * 15);
            // cameraComponent.camera.lookAt(new THREE.Vector3(0, 0, 0));
        };

        ScriptBank.add('/scripts/built-in/character-controller.js', CharacterControllerScript);
    });
