
import Head from "next/head";
import { useQuery } from "react-query";

import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import React from "react";
import dayjs from "dayjs";
import { useRouter } from "next/router";
import { ICreativeAds, fetchCreativesByCampaignId } from "@/services/creatives";
import Link from "next/link";
import { prevent } from "@/utils/prevent";
import ArrowBack from '@mui/icons-material/ArrowBack';
const columns = [
  {
    id: "name",
    label: "Name",
    minWidth: 170,
    align: "left",
    format: (value: string) => value,
  },
  {
    id: "configured_status",
    label: "Status",
    minWidth: 170,
    align: "left",
    format: (value: string) => value,
  },
  {
    id: "created_time",
    align: "left",
    label: "Criação",
    minWidth: 170,
    format: (value: string) => dayjs(value).format("DD/MM/YYYY"),
  },
  {
    id: "preview_shareable_link",
    align: "center",
    label: "Preview",
    minWidth: 60,
    format: (value: string) => (<Link onClick={prevent(() => window.open(value, '_blank'))} style={{color:'burlywood'}} target="_blank" href={value}>Preview</Link>),
  },
];

const HomePage = () => {
  const {push, query, back} = useRouter()
  const { data, isLoading, error, isError } = useQuery(
    "creativesAds",
    () => fetchCreativesByCampaignId(query.id as string),
    {
      
     
    }
  );

  const [page, setPage] = React.useState(0);
  const rowsPerPage = 10;

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  if (isError) return <div className="main-white-box">{error as any}</div>;
  return (
    <>
      <Head>
        <title>Face ads</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="main-app">
        <div className="main-white-box-container">
          <br />
          <div className="row0">
          <span style={{cursor:"pointer"}} onClick={()=> back()}>   <ArrowBack/></span>
          <h2>Creativos da campanha</h2>
          <span/>
          </div>
  
          <br />
          <Paper sx={{ width: "100%", overflow: "hidden" }}>
            <TableContainer sx={{ maxHeight: 450 }}>
              <Table stickyHeader aria-label="sticky table">
                <TableHead>
                  <TableRow>
                    {columns.map((column) => (
                      <TableCell
                        key={column.id}
                        align={column.align as any}
                        style={{ minWidth: column.minWidth }}
                      >
                        {column.label}
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {data
                    ?.slice(
                      page * rowsPerPage,
                      page * rowsPerPage + rowsPerPage
                    )
                    .map((row: ICreativeAds) => {
                      return (
                        <TableRow
                          style={{ cursor: "pointer" }}
                          onClick={()=> push(`/campaigns/${query.id}/creatives/${row.creative.id}`)}
                          hover
                          tabIndex={-1}
                          key={row.id}
                        >
                          {[...columns].map((column) => (
                            <TableCell
                              key={column.id}
                              align={column.align as any}
                              style={{ minWidth: column.minWidth }}
                            >
                              {/* @ts-ignore */}
                              {column.format(row[column.id])}
                            </TableCell>
                          ))}
                        </TableRow>
                      );
                    })}
                </TableBody>
              </Table>
            </TableContainer>
            <TablePagination
              component="div"
              count={data?.length || 0}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              rowsPerPageOptions={[10]}
            />
          </Paper>
        </div>
      </main>

      <div
        style={{ display: isLoading ? "flex" : "none" }}
        className={"loader"}
      />
    </>
  );
};

export default HomePage;
