export function compileShader(
    gl: WebGL2RenderingContext,
    type: GLenum,
    source: string,
): WebGLShader {
    const shader = gl.createShader(type);
    if (!shader) throw new Error("Failed to create shader");
    gl.shaderSource(shader, source);
    gl.compileShader(shader);
    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        const log = gl.getShaderInfoLog(shader);
        gl.deleteShader(shader);
        throw new Error(`Shader compile error: ${log}`);
    }
    return shader;
}

export function linkProgram(
    gl: WebGL2RenderingContext,
    vert: WebGLShader,
    frag: WebGLShader,
): WebGLProgram {
    const program = gl.createProgram();
    if (!program) throw new Error("Failed to create program");
    gl.attachShader(program, vert);
    gl.attachShader(program, frag);
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
        const log = gl.getProgramInfoLog(program);
        gl.deleteProgram(program);
        throw new Error(`Program link error: ${log}`);
    }
    return program;
}

export function createQuadVAO(gl: WebGL2RenderingContext, program: WebGLProgram) {
    const vao = gl.createVertexArray();
    if (!vao) throw new Error("Failed to create VAO");

    gl.bindVertexArray(vao);

    const buffer = gl.createBuffer();
    if (!buffer) throw new Error("Failed to create buffer");

    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(
        gl.ARRAY_BUFFER,
        new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]),
        gl.STATIC_DRAW,
    );

    const loc = gl.getAttribLocation(program, "aPosition");
    gl.enableVertexAttribArray(loc);
    gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);

    gl.bindVertexArray(null);

    return { vao, buffer };
}

export function getUniforms<T extends string>(
    gl: WebGL2RenderingContext,
    program: WebGLProgram,
    names: readonly T[],
): Record<T, WebGLUniformLocation | null> {
    const result = {} as Record<T, WebGLUniformLocation | null>;
    for (const name of names) {
        result[name] = gl.getUniformLocation(program, name);
    }
    return result;
}
