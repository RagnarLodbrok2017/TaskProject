<?php

namespace Modules\MediaManager\Http\Controllers\Api;

use Illuminate\Contracts\Support\Renderable;
use Illuminate\Http\Request;
use Illuminate\Routing\Controller;
use Modules\MediaManager\Http\Requests\FileRequest;
use Modules\MediaManager\Services\FileService;
use Modules\MediaManager\Transformers\FileResource;

class FileController extends Controller
{
    private $fileService;

    public function __construct(FileService $fileService)
    {
        $this->middleware(['auth:sanctum']);
        $this->fileService = $fileService;
    }

    /**
     * Display a listing of the resource.
     * @return Renderable|\Illuminate\Http\Resources\Json\AnonymousResourceCollection
     */
    public function index()
    {
        return FileResource::collection($this->fileService->getAll());
    }

    /**
     * Show the form for creating a new resource.
     * @return Renderable
     */
    public function create()
    {
        return view('mediamanager::create');
    }

    /**
     * Store a newly created resource in storage.
     * @param Request $request
     * @return Renderable|FileResource
     */
    public function store(FileRequest $request)
    {
        if (auth()->user())
        {
            $request->merge(['uploaded_by' => auth()->user()->id]);
        }
        $file = $this->fileService->store($request->all());
        if ($file)
        {
            return new FileResource($file);
        }
    }

    /**
     * Show the specified resource.
     * @param int $id
     * @return Renderable
     */
    public function show($id)
    {
        return view('mediamanager::show');
    }

    /**
     * Show the form for editing the specified resource.
     * @param int $id
     * @return Renderable
     */
    public function edit($id)
    {
        return view('mediamanager::edit');
    }

    /**
     * Update the specified resource in storage.
     * @param Request $request
     * @param int $id
     * @return Renderable|FileResource
     */
    public function update(FileRequest $request, $id)
    {
        if ($request->validated() && $id)
        {
            $request->merge(['id' => $id]);
            $file = $this->fileService->update($request->except('url','type','uploaded_by'));
            if ($file)
            {
                return new FileResource($file);
            }
        }
    }

    public function update_collection(Request $request)
    {
        if ($request)
        {
            return $this->fileService->updateCollection($request->all());
        }
    }

    /**
     * Remove the specified resource from storage.
     * @param int $id
     * @return Renderable|\Illuminate\Http\JsonResponse
     */
    public function destroy($id)
    {
        if ($id)
        {
            $result = $this->fileService->delete($id);
            if ($result)
            {
                return response()->json([
                    'status' => 'success',
                    'message' => 'File Deleted Successfully!',
                ],200);
            }
            else{
                return response()->json([
                    'status' => 'failed',
                    'message' => "File didn't delete!",
                ],502);
            }
        }
    }
}
