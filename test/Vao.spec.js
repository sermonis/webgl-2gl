import ShaderProgram from '../src/ShaderProgram';
import Buffer from '../src/Buffer';
import GlContext from './utils/GlContext';
import assert from 'assert';
import sinon from 'sinon';

import Vao from '../src/Vao';

describe('Vao', () => {
    let gl, program, vao, buffer, ext, state;

    beforeEach(() => {
        gl = new GlContext();
        ext = gl.getExtension('OES_vertex_array_object');
        program = new ShaderProgram({
            attributes: [{name: 'a_pos'}]
        });
        program.enable(gl);
        buffer = new Buffer(new Float32Array([0, 0, 0]));
        vao = new Vao(program, {
            a_pos: buffer
        });
        state = {
            gl,
            extensions: {
                OES_vertex_array_object: ext
            }
        };
    });

    describe('#bind', () => {
        it('should call extension\'s method bindVertexArrayOES', () => {
            const spy = sinon.spy(ext, 'bindVertexArrayOES');
            vao.bind(state);
            assert.ok(spy.calledOnce);
        });

        it('shouldn\'t call bindVertexArrayOES if extension not exist', () => {
            state.extensions.OES_vertex_array_object = null;
            const spy = sinon.spy(ext, 'bindVertexArrayOES');
            vao.bind(state);
            assert.ok(!spy.called);
        });

        it('should call program bind if extension not exist', () => {
            state.extensions.OES_vertex_array_object = null;
            const spy = sinon.spy(program, 'bind');
            vao.bind(state);
            assert.ok(spy.calledOnce);
        });
    });

    describe('#unbind', () => {
        it('should call extension\'s method bindVertexArrayOES', () => {
            vao.bind(state);
            const spy = sinon.spy(ext, 'bindVertexArrayOES');
            vao.unbind(state);
            assert.ok(spy.calledOnce);
        });

        it('shouldn\'t call bindVertexArrayOES if extension not exist', () => {
            state.extensions.OES_vertex_array_object = null;
            vao.bind(state);
            const spy = sinon.spy(ext, 'bindVertexArrayOES');
            vao.unbind(state);
            assert.ok(!spy.called);
        });
    });

    describe('#remove', () => {
        it('should call extension\'s method deleteVertexArrayOES', () => {
            vao.bind(state);
            const spy = sinon.spy(ext, 'deleteVertexArrayOES');
            vao.remove();
            assert.ok(spy.calledOnce);
        });

        it('shouldn\'t call deleteVertexArrayOES if extension not exist', () => {
            state.extensions.OES_vertex_array_object = null;
            vao.bind(state);
            const spy = sinon.spy(ext, 'deleteVertexArrayOES');
            vao.remove();
            assert.ok(!spy.called);
        });
    });
});
