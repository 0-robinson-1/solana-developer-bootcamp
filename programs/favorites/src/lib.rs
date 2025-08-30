use anchor_lang::prelude::*;

declare_id!("AEvRM2qnZZoQa7zVg1wbWjkyH4Ls4vxp4TRM31QKT8W9");

pub const ANCHOR_DISCRIMINATOR: usize = 8;

#[program]
pub mod favorites {
    use super::*;

    pub fn set_favorites() -> Return<()> {
        msg!("Greetings from {}", context.program_id);
    }
}

#[account]
#[derive(InitSpace)]
pub struct Favorites {
    pub number: u64,

    #[max_len(50)]
    pub color: String,

    #[max_len(5, 50)]
    pub hobbies: Vec<String>,
}

pub struct SetFavorites<'info> {
    #[account(mut)]
    pub user: Signer<'info>,

    #[account(
        init_if_needed,
        payer = user,
        space = ANCHOR_DISCRIMINATOR + Favorites::INIT_SPACE,
        seeds = [b"favorites", user.key().as_ref()],
        bump
    )]
    pub favorites: Account<'info, Favorites>,

    pub system_program: Program<'info, System>,
}