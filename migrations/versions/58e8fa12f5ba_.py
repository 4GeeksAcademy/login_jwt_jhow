"""empty message

Revision ID: 58e8fa12f5ba
Revises: 
Create Date: 2024-05-20 08:39:07.986938

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '58e8fa12f5ba'
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('acoustic',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('model', sa.String(length=250), nullable=False),
    sa.Column('scale', sa.Integer(), nullable=False),
    sa.Column('price', sa.Integer(), nullable=False),
    sa.Column('color', sa.String(length=250), nullable=False),
    sa.Column('manufacturer', sa.String(length=250), nullable=False),
    sa.Column('image', sa.String(length=500), nullable=True),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('classical',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('model', sa.String(length=250), nullable=False),
    sa.Column('scale', sa.Integer(), nullable=False),
    sa.Column('price', sa.Integer(), nullable=False),
    sa.Column('color', sa.String(length=250), nullable=False),
    sa.Column('manufacturer', sa.String(length=250), nullable=False),
    sa.Column('image', sa.String(length=500), nullable=True),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('electric',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('model', sa.String(length=250), nullable=False),
    sa.Column('scale', sa.Integer(), nullable=False),
    sa.Column('price', sa.Integer(), nullable=False),
    sa.Column('color', sa.String(length=250), nullable=False),
    sa.Column('manufacturer', sa.String(length=250), nullable=False),
    sa.Column('pickups', sa.String(length=250), nullable=False),
    sa.Column('image', sa.String(length=500), nullable=True),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('user',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('first_name', sa.String(length=250), nullable=False),
    sa.Column('last_name', sa.String(length=250), nullable=False),
    sa.Column('email', sa.String(length=250), nullable=False),
    sa.Column('password', sa.String(length=250), nullable=True),
    sa.Column('is_active', sa.Boolean(), nullable=False),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('email')
    )
    op.create_table('favorites',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('user_id', sa.Integer(), nullable=False),
    sa.Column('electric_id', sa.Integer(), nullable=True),
    sa.Column('acoustic_id', sa.Integer(), nullable=True),
    sa.Column('classical_id', sa.Integer(), nullable=True),
    sa.ForeignKeyConstraint(['acoustic_id'], ['acoustic.id'], ),
    sa.ForeignKeyConstraint(['classical_id'], ['classical.id'], ),
    sa.ForeignKeyConstraint(['electric_id'], ['electric.id'], ),
    sa.ForeignKeyConstraint(['user_id'], ['user.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('favorites')
    op.drop_table('user')
    op.drop_table('electric')
    op.drop_table('classical')
    op.drop_table('acoustic')
    # ### end Alembic commands ###
