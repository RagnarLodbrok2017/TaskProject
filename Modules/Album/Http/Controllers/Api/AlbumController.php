<?php

namespace Modules\Album\Http\Controllers\Api;

use Illuminate\Contracts\Support\Renderable;
use Illuminate\Http\Request;
use Illuminate\Routing\Controller;
use Modules\Album\Http\Requests\AlbumRequest;
use Modules\Album\Services\AlbumService;
use Modules\Album\Transformers\AlbumResource;
use function GuzzleHttp\Promise\all;

class AlbumController extends Controller
{
    private $albumService;

    public function __construct(AlbumService $albumService)
    {
        $this->albumService = $albumService;
    }

    /**
     * Display a listing of the resource.
     * @return Renderable|\Illuminate\Http\Resources\Json\AnonymousResourceCollection
     */
    public function index()
    {
        if (auth()->user())
        {
            $albums = $this->albumService->getAllForUserWithEager('files');
//            $albums = $this->albumService->getAllForUser()->with('files')->get();
//            dd($albums);
            return AlbumResource::collection($albums);
        }
    }

    /**
     * Show the form for creating a new resource.
     * @return Renderable
     */
    public function create()
    {
        return view('album::create');
    }

    /**
     * Store a newly created resource in storage.
     * @param Request $request
     * @return Renderable|\Illuminate\Http\JsonResponse|AlbumResource
     */
    public function store(AlbumRequest $request)
    {
        if (auth()->user())
        {
            $request->merge(['created_by' => auth()->user()->id]);
        }
        $result = $this->albumService->store($request->all());
        if ($result)
        {
            return new AlbumResource($result);
        }
    }

    /**
     * Show the specified resource.
     * @param int $id
     * @return Renderable
     */
    public function show($id)
    {
        return view('album::show');
    }

    /**
     * Show the form for editing the specified resource.
     * @param int $id
     * @return Renderable
     */
    public function edit($id)
    {
        return view('album::edit');
    }

    /**
     * Update the specified resource in storage.
     * @param Request $request
     * @param int $id
     * @return Renderable|AlbumResource
     */
    public function update(AlbumRequest $request, $id)
    {
        if ($request->validated() && $id)
        {
            $request->merge(['id' => $id]);
            $album = $this->albumService->update($request->all());
            if ($album)
            {
                return new AlbumResource($album);
            }
        }
    }

    /**
     * Remove the specified resource from storage.
     * @param int $id
     * @return bool|Renderable|\Illuminate\Http\JsonResponse
     */
    public function destroy($id)
    {
        if ($id)
        {
            $result = $this->albumService->delete($id);
            if ($result)
            {
                return response()->json([
                    'status' => 'success',
                    'message' => 'Album Deleted Successfully!',
                ],200);
            }
            else{
                return response()->json([
                    'status' => 'failed',
                    'message' => "Album didn't delete!",
                ],502);
            }
        }
    }
}
