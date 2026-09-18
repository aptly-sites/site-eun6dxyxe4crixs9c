import { Router, type IRouter } from "express";
import path from "path";
import healthRouter from "./health";
import formsRouter from "./forms";
import blogViewsRouter from "./blogViews";

const router: IRouter = Router();

router.use(healthRouter);
router.use(formsRouter);
router.use(blogViewsRouter);

router.get("/download-site", (_req, res) => {
  const file = "/tmp/equityteam-site.tar.gz";
  res.download(file, "equityteam-site.tar.gz");
});

export default router;
