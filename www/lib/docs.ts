import path from "path";
import fs from 'fs';
const indexDirectory = path.join(process.cwd(), '..', 'index');

export function getPackageIndex() {
    const fileNames = fs.readdirSync(indexDirectory);
    return fileNames.map((name) => ({ name: name.replace(/\.json$/, ''), version: "unknown" }));
}

export type Pkg = {
    name: string,
    version: string,
    documentation: Array<Documentation>,
    modules: Array<Module>
};

export type Documentation = string;
export type Module = {
    name: string,
    documentation: Array<Documentation>,
    functions: Array<Func>,
    variables: Array<Variable>,
    classes: Array<Class>,
}

export type Func = {
    name: string,
    asynchronous: boolean,
    params: Array<Param>
    returns: Typ | null,
    documentation: Array<Documentation>,
}

export type Param = {
    name: string,
    type: Typ,
}

export type Typ = string;

export type Variable = {
    name: string,
    type: Typ | null,
    documentation: Array<Documentation>,
}

export type Class = {
    name: string,
    bases: Array<string>,
    methods: Array<Func>,
    class_variables: Array<Variable>,
    instance_variables: Array<Variable>,
    inner_classes: Array<Class>,
    documentation: Array<Documentation>,
}


export function getPackage(name): Pkg {
    const indexFile = path.join(indexDirectory, `${name}.json`);
    const indexData = fs.readFileSync(indexFile, 'utf8');
    const index: Pkg = JSON.parse(indexData);
    return index;
}
