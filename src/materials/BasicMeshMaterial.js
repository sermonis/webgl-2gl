import {basic as shader} from '../shaders';
import Material from './Material';
import enums from '../enums';

/**
 * Простой материал для {@link Mesh}. Раскрашивает весь объект в один заданный цвет.
 * {@link Geometry} меша использующего этот материал должна содержать буфер вершин.
 *
 * @extends Material
 */
class BasicMeshMaterial extends Material {
    constructor() {
        super();

        this._attributes = [{name: 'position'}];
        this._uniforms = [
            {name: 'uColorAlpha', type: '1f'},
            {name: 'uCamera', type: 'mat4'},
            {name: 'uPosition', type: 'mat4'},
            {name: 'uColor', type: '3fv'}
        ];

        this._shader = shader;

        /**
         * Цвет в формате RGB
         * @type {Number[]}
         */
        this.color = [0, 0, 0];

        /**
         * Используется для обозначения типа материала
         * @type {Number}
         */
        this.type = enums.BASIC_MESH_MATERIAL;
    }

    _shaderProgramBind({gl, object, camera}) {
        const attributes = {};
        this._attributes.forEach(obj => {
            attributes[obj.name] = object.geometry.getBuffer(obj.name);
        });

        const uniforms = {
            uColorAlpha: this.opacity,
            uPosition: new Float32Array(object.worldMatrix),
            uCamera: new Float32Array(camera.modelViewMatrix),
            uColor: this.color
        };

        this._shaderProgram.bind(gl, uniforms, attributes);
    }
}

export default BasicMeshMaterial;
