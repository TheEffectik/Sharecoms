import { Address, beginCell, Cell, Contract, contractAddress, ContractProvider, Sender, SendMode } from '@ton/core';

export type SharecomsConfig = { // need to change
    last_commission_time: number;
    jetton_wallet_address: Address;
    owner_address: Address;
    collection_address: Address;
    nft_item_code: Cell;
};

export function SharecomsConfigToCell(config: SharecomsConfig): Cell { // need to change 
    return beginCell()
                .storeUint(0, 1)
                .storeUint(config.last_commission_time, 32)
                .storeRef(
                    beginCell()
                    .storeAddress(config.jetton_wallet_address)
                    .storeAddress(config.jetton_wallet_address) 
                    .endCell()
                )
                .storeRef(
                    beginCell()
                    .storeAddress(config.owner_address)
                    .storeAddress(config.collection_address)
                    .storeRef(config.nft_item_code) // address for distribution part of income to JVT holders
                    .endCell()
                )
                .storeDict()
                .storeDict()   
                .endCell();
}

export class Sharecoms implements Contract {
    constructor(readonly address: Address, readonly init?: { code: Cell; data: Cell }) {}

    static createFromAddress(address: Address) {
        return new Sharecoms(address);
    }

    static createFromConfig(config: SharecomsConfig, code: Cell, workchain = 0) {
        const data = SharecomsConfigToCell(config);
        const init = { code, data };
        return new Sharecoms(contractAddress(workchain, init), init);
    }

    async sendDeploy(provider: ContractProvider, via: Sender, value: bigint) { 
        await provider.internal(via, {
            value,
            sendMode: SendMode.PAY_GAS_SEPARATELY,
            body: beginCell().endCell(),
        });
    }
}
