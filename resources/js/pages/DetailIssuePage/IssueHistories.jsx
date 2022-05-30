import { Avatar, Box, Divider, Link, Stack, Typography } from '@mui/material';
import { useTheme } from '@emotion/react';
import { diffForHumans } from '../../utils/common';

const IssueHistories = ({ histories }) => {
  const theme = useTheme();

  return (
    <Box>
      <Box py={1} position="sticky" top={0} zIndex={99} bgcolor="white">
        <Typography variant="h6">History</Typography>
      </Box>
      {!!histories?.length && <Divider />}
      <Box pt={1.5}>
        <Stack spacing={1.5} divider={<Divider />}>
          {histories?.map((history) => (
            <Box key={history.id}>
              <Box
                display="flex"
                alignItems="flex-start"
                justifyContent="flex-start"
              >
                <Avatar sx={{ width: 28, height: 28, mr: 1 }} />
                <Box>
                  <Typography
                    gutterBottom
                    variant="subtitle2"
                    component={Box}
                    fontWeight="bold"
                  >
                    <Typography
                      variant="subtitle2"
                      display="inline"
                      fontWeight="bold"
                      mr={0.5}
                    >
                      Updated by
                    </Typography>
                    <Typography display="inline" variant="subtitle2">
                      <Link
                        href="#"
                        underline="hover"
                        sx={{ fontWeight: 'bold' }}
                      >
                        {`${history?.updated_user?.name} about `}
                      </Link>
                    </Typography>
                    <Typography display="inline" variant="subtitle2">
                      <Link
                        href="#"
                        underline="hover"
                        sx={{ fontWeight: 'bold' }}
                      >
                        {diffForHumans(
                          new Date(),
                          new Date(history.created_at),
                        ) === 0
                          ? 'just now'
                          : `${diffForHumans(
                              new Date(),
                              new Date(history.created_at),
                            )} ago`}
                      </Link>
                    </Typography>
                  </Typography>
                  <ul>
                    <Stack spacing={1}>
                      {history.detail_histories.map((detail) => (
                        <li key={detail.id}>
                          <Typography component={Box}>
                            <Typography
                              fontWeight="bold"
                              textTransform="capitalize"
                              display="inline"
                              variant="body2"
                              color={theme.palette.text.secondary}
                            >
                              {detail.key}
                            </Typography>
                            {detail.old_value !== null ? (
                              <>
                                <Typography
                                  display="inline"
                                  variant="body2"
                                  marginLeft={0.5}
                                  color={theme.palette.text.secondary}
                                >
                                  changed from
                                </Typography>
                                <Typography
                                  fontStyle="italic"
                                  display="inline"
                                  variant="body2"
                                  marginLeft={0.5}
                                  color={theme.palette.text.secondary}
                                >
                                  {detail.old_value}
                                </Typography>
                                <Typography
                                  display="inline"
                                  variant="body2"
                                  marginLeft={0.5}
                                  color={theme.palette.text.secondary}
                                >
                                  to
                                </Typography>
                              </>
                            ) : (
                              <Typography
                                display="inline"
                                variant="body2"
                                marginLeft={0.5}
                                color={theme.palette.text.secondary}
                              >
                                set to
                              </Typography>
                            )}

                            <Typography
                              fontStyle="italic"
                              display="inline"
                              variant="body2"
                              color={theme.palette.text.secondary}
                              marginLeft={0.5}
                            >
                              {detail.new_value}
                            </Typography>
                          </Typography>
                        </li>
                      ))}
                    </Stack>
                  </ul>
                </Box>
              </Box>
              {history.note && (
                <Typography variant="subtitle1">{history.note}</Typography>
              )}
            </Box>
          ))}
        </Stack>
      </Box>
    </Box>
  );
};
export default IssueHistories;
