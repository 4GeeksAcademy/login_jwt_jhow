"""empty message

Revision ID: 52322357f029
Revises: 42ddbfd227aa
Create Date: 2024-11-29 18:33:09.766946

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '52322357f029'
down_revision = '42ddbfd227aa'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('post_description', schema=None) as batch_op:
        batch_op.alter_column('zone',
               existing_type=sa.VARCHAR(length=30),
               nullable=False)

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('post_description', schema=None) as batch_op:
        batch_op.alter_column('zone',
               existing_type=sa.VARCHAR(length=30),
               nullable=True)

    # ### end Alembic commands ###
