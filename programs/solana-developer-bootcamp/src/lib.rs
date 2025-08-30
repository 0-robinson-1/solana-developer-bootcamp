use anchor_lang::prelude::*;

declare_id!("6SM82uEEQPJ8oMT6CRSPtnffE6Xoc6qgSd88YxrP2JDf");

#[program]
pub mod solana_developer_bootcamp {
    use super::*;

    pub fn initialize(ctx: Context<Initialize>) -> Result<()> {
        msg!("Greetings from: {:?}", ctx.program_id);
        Ok(())
    }
}

#[derive(Accounts)]
pub struct Initialize {}
