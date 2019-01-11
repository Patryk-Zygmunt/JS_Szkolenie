import { promisify } from "util";
import * as fs from "fs";


export type errback<T = any> = (err?: Error | null, result?: T) => void;


export const fs_exists = promisify(fs.exists);
export const fs_readFile = promisify(fs.readFile);
export const fs_writeFile = promisify(fs.writeFile);
export const fs_readdir = promisify(fs.readdir);
export const fs_mkdir = promisify(fs.mkdir);
export const fs_stat = promisify(fs.stat);

// type func0<TResult> = () => TResult;
// type func1<T1, TRes> = (arg1: T1) => TRes;
// type func2<T1, T2, TRes> = (arg1: T1, arg2: T2) => TRes;
// type func3<T1, T2, T3, TRes> = (arg1: T1, arg2: T2, arg3: T3) => TRes;
// type func4<T1, T2, T3, T4, TRes> = (arg1: T1, arg2: T2, arg3: T3, arg4: T4) => TRes;

// export function promisify<TRes>(f: func1<errback<TRes>, void>): func0<Promise<TRes>>;
// export function promisify<T1, TRes>(f: func2<T1, errback<TRes>, void>): func1<T1, Promise<TRes>>;
// export function promisify<T1, T2, TRes>(f: func3<T1, T2, errback<TRes>, void>): func2<T1, T2, Promise<TRes>>;
// export function promisify<T1, T2, T3, TRes>(f: func4<T1, T2, T3, errback<TRes>, void>): func3<T1, T2, T3, Promise<TRes>>;
// export function promisify(f: Function) {
//     return function () {
//         const args = Array.from(arguments);
//         return new Promise(function (resolve, reject) {
//             f.apply(null, args.concat(function (err: any, result: any) {
//                 if (err) {
//                     reject(err);
//                 } else {
//                     resolve(result);
//                 }
//             }));
//         });
//     };
// }

// export function p<T = any>(f: (c: errback<T>) => void) {
//     return new Promise<T>(function (resolve, reject) {
//         f(function (err, result) {
//             if (err) {
//                 reject(err);
//             } else {
//                 resolve(result);
//             }
//         });
//     });
// }






// async function copyFolder(sourcePath: string, targetPath: string) {

//         if (! await p(c => fs.exists(sourcePath, e => c(null, e)))) {
//             return;
//         }

//         // stworz folder docelowy jesli nie istnieje
//         if (!fs.existsSync(targetPath)) {
//             fs.mkdirSync(targetPath);
//         }

//         // pobierz liste plikow i folderow
//         const fdNames = fs.readdirSync(sourcePath);

//         // skopiuj jedynie plik
//         // skopiuj pliki oraz foldery
//         for (const fdName of fdNames) {
//             const fullPath = path.join(sourcePath, fdName);
//             if (!fs.statSync(fullPath).isDirectory()) {
//                 copyFileSync(fullPath, path.join(targetPath, fdName));
//             } else {
//                 copyFolderSync(fullPath, path.join(targetPath, fdName));
//             }
//         }
//     }

//     async function copyFile(sourcePath: string, targetPath: string) {
//         const data = await p<Buffer>(c => fs.readFile(sourcePath, c));
//         await p(c => fs.writeFile(targetPath, data, c));
//     }
