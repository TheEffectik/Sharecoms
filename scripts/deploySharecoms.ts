import { Cell, Address, toNano } from '@ton/core';
import { Sharecoms } from '../wrappers/Sharecoms';
import { compile, NetworkProvider } from '@ton/blueprint';

export async function run(provider: NetworkProvider) {
    const sharecoms = provider.open(Sharecoms.createFromConfig({
        last_commission_time: 0,
        jetton_wallet_address: Address.parse("kQBtwyMar7qe8T-Thv8v7XL-2w4ewSQ_B_0PqKIBPX3hgmQm") as Address,
        owner_address: Address.parse("0QCWVqwkomdw-o4wsVqdBO_HHkv584nZw0ziJUVgeUWG6MkO") as Address,
        collection_address: Address.parse("0:bb83052883be3c91a36bb1da33f4d13ba694eff1da89f97bf0ec4280faa70724") as Address,
        nft_item_code: Cell.fromBase64("te6ccgECFgEABQYAART/APSkE/S88sgLAQIBYgIDAgLMBAUCASAQEQIB1AYHAGe18JmRl/+T8JfwlfCT8I3wj/CFkZY/8IeeLfCJni3wi/QFlj/wkfQFlj+WAZYBlgGZk9qpAfcIMcAkl8E4O1E0NMfAfhi+kAB+GNw+GEg10nCAI4zcfhh+kAB+GT6AAH4ZdMfAfhn+gAB+GjTHwH4ZtMAAfhp0wAB+GrTAAH4a9Qw0NP/MPhskTDiAdDTA/pAAnGwnWxB+EPHBZVx+GvwCt7gAfpAMfoAMXHXIfoAMfoAgCAARPpEMHC68uFNgAvwwpwP4QcAAjmIwM/hDUAPHBfLhlQGAQNch+kAB+GT6AAH4ZdMfAfhm0x8B+GfT/wH4bNMAAfhp0wAw+Gpx+Gtw+GhwghAFE42RIYAQyMsF+ETPFgSCCvrwgKEU+gITy2oSyx/LP8lw+wDwCuAC0x/TPyKCEF/MPRS64wI0NSAJCgKyMjT4SUFAE/hEFccF8uGRA8AB8rP6QCHwAfpA0gAx+gAg10nCAPLixAaCCvrwgKEhlFMVoKHeItcLAcMAIJIGoZE24iDC//LhkiGSNjDjDQOSbDHjDfhk8AoLDAH+ghCnad4nuiGCELXeX566sY5tMvhEAccF8rL4S8AB8rUgghC13l+euo4RAYIQEeGjAL7yjfgj+Ee+8qyaAYIQC+vCAL7yjeL4SvhM+EIDyMsfFMs/Essf+ETPFvhF+gISy//LAMlxgBjIywX4Q88WcPoCy2rMyYBA+wBw+GvwCg0AeoIQBRONkcj4RM8WUAjPFnElBEkTVEegcIAQyMsFUAfPFlAF+gIVy2oSyx/LPyJus5RYzxcBkTLiAckB+wAAaCLwAROCENUydttQBG1xcIAQyMsFUAfPFlAF+gIVy2oSyx/LPyJus5RYzxcBkTLiAckB+wACyuAzIoIQ3KPaTLrjAiKCEC/LJqK6jj5sIXCCEIt3FzX4QsjL//hDzxYQNEEwgEBwgBDIywVQB88WUAX6AhXLahLLH8s/Im6zlFjPFwGRMuIByQH7AOAwAYIQW4jlzLrjAluED/LwDg8A+jL4Q1jHBfKy0/8B+Gz4SAH6AFmg+GjTADCUMHH4a45a+EQBcIIQ1TJ221htgwZwgBDIywVQB88WUAX6AhXLahLLH8s/Im6zlFjPFwGRMuIByQH7AI0IYAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABPhk4vAKAE76QDDtRIIQqrSo73CAEMjLBVAEzxYj+gITy2oSyx8Syz/MyYBA+wACASASEwIBSBQVAM+4td7UTQ0x8B+GL6QAH4Y3D4YSDXScIAjjNx+GH6QAH4ZPoAAfhl0x8B+Gf6AAH4aNMfAfhm0wAB+GnTAAH4atMAAfhr1DDQ0/8w+GyRMOL4SPhG+Ef4RqH4RXD4QvhE+EP4SfhL+EyAAHuBkHWACztfn9qJoaY+A/DF9IAD8Mbh8MJBrpOEARxm4/DD9IAD8Mn0AAPwy6Y+A/DP9AAD8NGmPgPwzaYAA/DTpgAD8NWmAAPw16hhoaf+YfDZImHF8IPwhfCH8ImRkwAMu2ED2omhpj4D8MX0gAPwxuHwwkGuk4QBHGbj8MP0gAPwyfQAA/DLpj4D8M/0AAPw0aY+A/DNpgAD8NOmAAPw1aYAA/DXqGGhp/5h8NkiYcXwg/CF8IfwifCL8I3wj/CR8JPwl/CZA=") as Cell,
    }, await compile('Sharecoms')));

    await sharecoms.sendDeploy(provider.sender(), toNano('0.05'));

    await provider.waitForDeploy(sharecoms.address);

    // run methods on `sharecoms`

    console.log('Sharecoms deployed at', sharecoms.address.toString());
}
