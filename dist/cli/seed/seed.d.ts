import { SeedBase } from "../../seed";
export declare class Seed {
    static generate(name: string): Promise<void>;
    static up(name: string): Promise<void>;
    static down(name: string): Promise<void>;
    private getTargetFilepath;
    protected do(name: string): Promise<void>;
    protected down(name: string): Promise<void>;
    protected generate(name: string): Promise<void>;
    private createDirectory;
    protected importSeedMocules(name: string): Promise<SeedBase>;
}
